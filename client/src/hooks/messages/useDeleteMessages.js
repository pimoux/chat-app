const useDeleteMessages = (deleteMessage, setDeleteMessage, socket) => {
    const onSelectMessageToDelete = message => {
            setDeleteMessage(message.id);
    };

    const onDeleteMessage = () => {
        if (deleteMessage) {
            socket.emit('trigger-delete-message', deleteMessage);
        }
    };

    return [onSelectMessageToDelete, onDeleteMessage];
}

export default useDeleteMessages;