import { useContext, useEffect } from 'react'
import ChatContext from '../../context/ChatContext'

let recognition;

const usePrivateSpeech = (isOpen, setIsOpen) => {

    const {
        isPrivateSpeech,
        setIsPrivateSpeech,
        privateSpeechContent,
        setPrivateSpeechContent,
        setPrivateMessage,
        onSelectUsername,
        setIsSpeechActivated
    } = useContext(ChatContext);

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
        setPrivateMessage('')
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
                setPrivateMessage(privateSpeechContent);
                document.querySelector(
                    '#send-private-message').value = privateSpeechContent;
            }, 0);
        }
    }, [privateSpeechContent, setPrivateMessage, isOpen, isPrivateSpeech]);

    return [toggleSpeech, onRequestClose];
};

export default usePrivateSpeech;