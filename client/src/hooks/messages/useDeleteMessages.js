const useDeleteMessages = (deleteMessage, setDeleteMessage, socket) => {
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

    return [onSelectMessageToDelete, onDeleteMessage];
}

export default useDeleteMessages;