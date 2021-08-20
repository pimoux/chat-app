import io from 'socket.io-client';
import queryString from 'querystring';
import {useCallback, useEffect} from 'react';
import resize from '../../utils/resizeEvent';

let socket;

const useSetupSockets = (
    location, setName, room, setRoom, setRooms, messages, setMessages, setUsers,
    setDisconnectedUsername
) => {

    window.addEventListener('resize', resize, true);

    const memoizedName = useCallback((name) => {
        setName(name);
    }, [setName]);

    const memoizedRoom = useCallback((room) => {
        setRoom(room);
    }, [setRoom]);

    const memoizedRooms = useCallback((rooms) => {
        setRooms(rooms);
    }, [setRooms]);

    const memoizedDisconnectedUsername = useCallback((username) => {
        setDisconnectedUsername(username);
    }, [setDisconnectedUsername]);

    const memoizedMessages = useCallback((messages) => {
        setMessages(messages);
    }, [setMessages])

    const memoizedUsers = useCallback((users) => {
        setUsers(users);
    }, [setUsers])

    const ENDPOINT = 'https://pimoux-react-chat-app.herokuapp.com/';
    useEffect(() => {
        socket = io(ENDPOINT);
        const { name, room } = queryString.parse(location.search.split('?')[1]);
        memoizedName(name.trim().toLowerCase());
        memoizedRoom(room);
        document.title = name.toString();

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                setTimeout(() => window.location = `http://localhost:3000`,
                    1000);
                alert(error);
            }
        });

        socket.on('history', (messagesHistory) => {
            memoizedMessages([...messagesHistory]);
        })

        return () => {
            socket.disconnect();
            socket.off();
        };

    }, [
        ENDPOINT, location.search, memoizedName, memoizedRoom, memoizedMessages
    ]);

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

        socket.on('room-list', (rooms) => {
            memoizedRooms(rooms);
        })

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
    }, [
        messages, memoizedDisconnectedUsername, memoizedMessages, memoizedUsers,
        memoizedRooms
    ]);

    return [socket];
};

export default useSetupSockets;