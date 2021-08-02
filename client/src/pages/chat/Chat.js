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
    const [selectedUsername, setSelectedUsername] = useState('');
    const [message, setMessage] = useState('');
    const [privateMessage, setPrivateMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        socket = io(ENDPOINT);
        const {name} = queryString.parse(location.search, '?');
        setName(name);

        socket.emit('join', {name}, (error) => {
            if (error) {
                setTimeout(() => window.location = `http://localhost:3000`, 1000);
                alert(error);
            }
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

        socket.on('private-message', (privateMessage) => {
            setMessages([...messages, privateMessage]);
        })

        socket.on('users', (user) => {
            setUsers(user);
        })

        //avoid lag
        return () => {
            socket.off();
        }
    }, [messages]);

    const onChangeMessage = message => {
        setMessage(message);
    }

    const onChangePrivateMessage = privateMessage => {
        setPrivateMessage(privateMessage);
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

    const onSendPrivateMessage = e => {
        e.preventDefault()
        if (privateMessage) {
            socket.emit('send-private-message', {
                content: privateMessage,
                recipient: selectedUsername
            }, () => {

            })
            setPrivateMessage('');
            document.querySelectorAll('.send-private-message').forEach(input => input.value = '')
        }
    }

    const onSelectUsername = e => {
        setSelectedUsername(e.target.textContent);
    }

    return (
        <div className="chat">
            <RoomListItem/>
            <ChatZone
                onChangeMessage={onChangeMessage}
                onKeyPress={onSendMessage}
                messages={messages}
                name={name}
                privateRecipient={selectedUsername}
            />
            <UserListItem
                users={users}
                name={name}
                onChangeMessage={onChangePrivateMessage}
                onKeyPress={onSendPrivateMessage}
                onSelectUsername={onSelectUsername}
            />
        </div>
    )
}

export default Chat;