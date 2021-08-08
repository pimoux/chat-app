import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import queryString from 'querystring';
import useFiles from './useFiles';
import useMessages from './useMessages';
import useSpeech from './useSpeech';

let socket;

const useWebSockets = (location) => {
    const [name, setName] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [
        onChangeMessage,
        onChangePrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        message,
        setMessage,
        privateMessage,
        setPrivateMessage,
    ] = useMessages(selectedUsername, socket);
    const [
        isSpeechActivated,
        setIsSpeechActivated,
        setSpeechContent,
        isPrivateSpeech,
        setIsPrivateSpeech,
        privateSpeechContent,
        setPrivateSpeechContent,
    ] = useSpeech(setMessage, selectedUsername);
    const [onUploadFile, onPrivateUploadFile] = useFiles(selectedUsername,
        socket);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        socket = io(ENDPOINT);
        const {name} = queryString.parse(location.search, '?');
        setName(name);

        socket.emit('join', {name}, (error) => {
            if (error) {
                setTimeout(() => window.location = `http://localhost:3000`,
                    1000);
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('delete-message', (id) => {
            setMessages([...messages].filter(message => message.id !== id));
        });

        socket.on('users', (user) => {
            setUsers(user);
        });

        //avoid lag
        return () => {
            socket.off();
        };
    }, [messages]);

    const onSendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', message, () => {
                setMessage('');
                document.querySelector('#send-message').value = '';
            });
        }
        setSpeechContent('');
    };

    const onSendPrivateMessage = e => {
        e.preventDefault();
        if (privateMessage && selectedUsername) {
            socket.emit('send-private-message', {
                content: privateMessage,
                recipient: selectedUsername,
            });
            setPrivateMessage('');
            document.querySelector('#send-private-message').value = '';
        }
        setPrivateSpeechContent('');
    };

    const onSelectUsername = e => {
        e
            ? setSelectedUsername(e.target.textContent)
            : setSelectedUsername('');
    };

    return [
        name,
        selectedUsername,
        messages,
        users,
        isSpeechActivated,
        setIsSpeechActivated,
        onChangeMessage,
        onChangePrivateMessage,
        onUploadFile,
        onPrivateUploadFile,
        onSendMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        onSelectUsername,
        isPrivateSpeech,
        setIsPrivateSpeech,
        privateSpeechContent,
        setPrivateSpeechContent,
    ];
};

export default useWebSockets;