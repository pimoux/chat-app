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
        onSelectMessageToDelete,
        onDeleteMessage,
        message,
        setMessage,
        privateMessage,
        setPrivateMessage
    ];
};

export default useMessages;