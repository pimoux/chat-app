import {useEffect} from 'react';

let recognition;

const usePrivateSpeech = (
    isPrivateSpeech,
    setIsPrivateSpeech,
    privateSpeechContent,
    setPrivateSpeechContent,
    isOpen,
    setIsOpen,
    onChangePrivateMessage,
    onSelectUsername,
    setIsSpeechActivated
) => {
    const toggleSpeech = () => {
        if (!isPrivateSpeech) {
            if (privateSpeechContent.length) {
                setPrivateSpeechContent(privateSpeechContent + ' ');
            }
            recognition.start();
        } else {
            recognition.stop();
        }
        setIsPrivateSpeech(!isPrivateSpeech);
    };

    const onRequestClose = () => {
        setIsOpen(false);
        setIsPrivateSpeech(false);
        recognition.stop();
        setPrivateSpeechContent('');
        onSelectUsername(null);
        setIsSpeechActivated(false);
        onChangePrivateMessage('')
    };

    useEffect(() => {
        let speechRecognition = window.webkitSpeechRecognition;
        recognition = new speechRecognition();
        recognition.continuous = true;
    }, []);

    useEffect(() => {
        recognition.error = () => {
            console.log('Une erreur s\'est produite lors de l\'activation');
        };

        recognition.lang = 'fr-FR';

        recognition.onresult = (e) => {
            let current = e.resultIndex;
            let transcript = e.results[current][0].transcript;
            setPrivateSpeechContent(privateSpeechContent + transcript);
        };
    }, [isPrivateSpeech, privateSpeechContent, setPrivateSpeechContent]);

    useEffect(() => {
        if (isOpen && isPrivateSpeech) {
            setTimeout(() => {
                onChangePrivateMessage(privateSpeechContent);
                document.querySelector(
                    '#send-private-message').value = privateSpeechContent;
            }, 1000);
        }
    }, [privateSpeechContent, onChangePrivateMessage, isOpen, isPrivateSpeech]);

    return [toggleSpeech, onRequestClose];
};

export default usePrivateSpeech;