const useHandleBlock = (users, name, room, selectedUsername, socket) => {
    const handleBlock = () => {
        users.find(user => user.name === selectedUsername)
        .acceptMessagesBy
        .find(username => username === name) ?
            socket.emit('trigger-block', {name, room, recipient: selectedUsername}) :
            socket.emit('trigger-accept', {name, room, recipient: selectedUsername});
    };

    return [handleBlock];
}

export default useHandleBlock;