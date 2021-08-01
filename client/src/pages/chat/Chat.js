import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import queryString from 'querystring';
import RoomListItem from "../../components/RoomListItem/RoomListItem";
import UserListItem from "../../components/UserListItem/UserListItem";
import ChatZone from "../../components/ChatZone/ChatZone";
import './Chat.css';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';

    socket = io(ENDPOINT);

    useEffect(() => {
        const {name} = queryString.parse(location.search, '?');
        setName(name);

        socket.emit('join', {name}, (error) => {
            if(error){
                setTimeout(() => window.location = `http://localhost:3000`, 1000);
                alert(error);
            }
        })

        socket.on('users', (user) => {
            setUsers(user);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

        //avoid lag
        return () => {
            socket.off();
        }
    }, [messages]);

    const onChangeMessage = message => {
        setMessage(message);
    }

    const onSendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', message, () => {
                setMessage('')
                document.querySelector('#send-message').value = '';
            });
        }
    }

    return (
        <div className="chat">
            <RoomListItem/>
            <ChatZone
                onChangeMessage={onChangeMessage}
                onKeyPress={onSendMessage}
                messages={messages}
                name={name}
            />
            <UserListItem users={users} name={name}/>
        </div>
    )
}

export default Chat;