const useSendMessages = (
    setSpeechContent,
    setPrivateSpeechContent,
    message,
    setMessage,
    privateMessage,
    setPrivateMessage,
    selectedUsername,
    socket
) => {
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

    return [onSendMessage, onSendPrivateMessage];
};

export default useSendMessages;