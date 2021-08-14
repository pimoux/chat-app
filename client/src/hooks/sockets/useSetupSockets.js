import io from 'socket.io-client';
import queryString from 'querystring';
import {useCallback, useEffect} from 'react';
import {closeRoomList, closeUserList} from '../../utils/sidebars';

let socket, cooldown;

const useSetupSockets = (location, setName, messages, setMessages, setUsers, setDisconnectedUsername) => {

    window.addEventListener('resize', (e) => {
        //limit massive executions of resize event
        clearTimeout(cooldown);
        cooldown = setTimeout(() => {
            if (e.currentTarget.innerWidth >= 640) {
                document.querySelector('.room-list-item').style.width = '12.5vw';
                document.querySelector('.user-list-item').style.width = '12.5vw';
            } else if (e.currentTarget.innerWidth < 640 &&
                ((document.querySelector('.room-list-item').style.width === '12.5vw') ||
                    document.querySelector('.user-list-item').style.width === '12.5vw')) {
                closeUserList();
                closeRoomList();
            }
        }, 200);
    }, true);

    const memoizedName = useCallback((name) => {
        setName(name);
    }, [setName]);

    const memoizedDisconnectedUsername = useCallback((username) => {
        setDisconnectedUsername(username);
    }, [setDisconnectedUsername]);

    const memoizedMessages = useCallback((messages) => {
        setMessages(messages);
    }, [setMessages])

    const memoizedUsers = useCallback((users) => {
        setUsers(users);
    }, [setUsers])

    const ENDPOINT = 'http://localhost:5000';
    useEffect(() => {
        socket = io(ENDPOINT);
        const {name} = queryString.parse(location.search, '?');
        memoizedName(name);
        document.title = name.toString();

        socket.emit('join', {name}, (error) => {
            if (error) {
                setTimeout(() => window.location = `http://localhost:3000`,
                    1000);
                alert(error);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        };

    }, [ENDPOINT, location.search, memoizedName]);

    useEffect(() => {
        socket.on('message', (message) => {
            memoizedMessages([...messages, message]);
        });

        socket.on('delete-message', (id) => {
            memoizedMessages([...messages].filter(message => message.id !== id));
        });

        socket.on('users', (user) => {
            memoizedUsers(user);
        });

        socket.on('handleBlock', (user) => {
            memoizedUsers(user);
        });

        socket.on('handle-disconnect', (username) => {
            memoizedDisconnectedUsername(username);
            setTimeout(() => memoizedDisconnectedUsername(''), 0);
        });

        //avoid lag
        return () => {
            socket.off();
        };
    }, [messages, memoizedDisconnectedUsername, memoizedMessages, memoizedUsers]);

    return [socket];
};

export default useSetupSockets;