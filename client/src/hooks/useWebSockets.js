import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import queryString from 'querystring';
import useFiles from './useFiles';
import useMessages from './useMessages';

let socket, speechContent, recognition;

const useWebSockets = (location) => {
    const [name, setName] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isSpeechActivated, setIsSpeechActivated] = useState(false);
    const [onUploadFile, onPrivateUploadFile] = useFiles(selectedUsername, socket);
    const [
        onChangeMessage,
        onChangePrivateMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        message,
        setMessage,
    ] = useMessages(selectedUsername, socket);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        socket = io(ENDPOINT);
        const {name} = queryString.parse(location.search, '?');
        setName(name);

        let speechRecognition = window.webkitSpeechRecognition;
        recognition = new speechRecognition();
        speechContent = '';
        recognition.continuous = true;

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

    useEffect(() => {
        let publicMicrophoneElt = document.querySelector(
            '#fa-microphone-public');
        publicMicrophoneElt.onclick = () => {
            if (!isSpeechActivated) {
                if (speechContent.length) {
                    speechContent += '';
                }
                recognition.start();
            } else {
                recognition.stop();
                speechContent = '';
            }
            setIsSpeechActivated(!isSpeechActivated);
        };

        recognition.error = () => {
            console.log('une erreur est survenue');
        };

        recognition.lang = 'fr-FR';

        recognition.onresult = (e) => {
            let current = e.resultIndex;
            let transcript = e.results[current][0].transcript;
            speechContent += transcript;
            document.querySelector('#send-message').value = speechContent;
            setMessage(speechContent);
        };
    }, [isSpeechActivated]);

    const onSendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', message, () => {
                setMessage('');
                document.querySelector('#send-message').value = '';
            });
        }
        speechContent = '';
    };

    const onSelectUsername = e => {
        setSelectedUsername(e.target.textContent);
        if (isSpeechActivated) {
            recognition.stop();
            setIsSpeechActivated(false);
        }
    };

    return [
        name,
        selectedUsername,
        messages,
        users,
        isSpeechActivated,
        onChangeMessage,
        onChangePrivateMessage,
        onUploadFile,
        onPrivateUploadFile,
        onSendMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        onSelectUsername,
    ];
};

export default useWebSockets;