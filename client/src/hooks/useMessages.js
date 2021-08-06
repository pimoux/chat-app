import {useState} from 'react';

const useMessages = (selectedUsername, socket) => {
    const [message, setMessage] = useState('');
    const [privateMessage, setPrivateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const onChangeMessage = message => {
        setMessage(message);
    };

    const onChangePrivateMessage = privateMessage => {
        setPrivateMessage(privateMessage);
    };

    const onSendPrivateMessage = e => {
        e.preventDefault();
        if (privateMessage && selectedUsername) {
            socket.emit('send-private-message', {
                content: privateMessage,
                recipient: selectedUsername,
            });
            setPrivateMessage('');
            document.querySelector('.send-private-message').value = '';
        }
    };

    const onSelectMessageToDelete = message => {
        message.private ? setDeleteMessage({
                id: message.id,
                isPrivate: message.private,
                recipient: message.recipient,
            }) :
            setDeleteMessage({id: message.id});
    };

    const onDeleteMessage = () => {
        if (deleteMessage) {
            socket.emit('trigger-delete-message', deleteMessage);
        }
    };

    return [
        onChangeMessage,
        onChangePrivateMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        message,
        setMessage
    ];
};

export default useMessages;