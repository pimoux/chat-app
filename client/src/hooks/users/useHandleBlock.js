const useHandleBlock = (users, name, selectedUsername, socket) => {
    const handleBlock = () => {
        users.find(user => user.name === selectedUsername)
        .acceptMessagesBy
        .find(username => username === name) ?
            socket.emit('trigger-block', {name, recipient: selectedUsername}) :
            socket.emit('trigger-accept', {name, recipient: selectedUsername});
    };

    return [handleBlock];
}

export default useHandleBlock;