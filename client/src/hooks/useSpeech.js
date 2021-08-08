import {useEffect, useState} from 'react';

let recognition;

const useSpeech = (setMessage, selectedUsername) => {
    const [isSpeechActivated, setIsSpeechActivated] = useState(false);
    const [isPrivateSpeech, setIsPrivateSpeech] = useState(false);
    const [speechContent, setSpeechContent] = useState('');
    const [privateSpeechContent, setPrivateSpeechContent] = useState('');

    useEffect(() => {
        let speechRecognition = window.webkitSpeechRecognition;
        recognition = new speechRecognition();
        recognition.continuous = true;
    }, []);

    useEffect(() => {
        let publicMicrophoneElt = document.querySelector(
            '#fa-microphone-public');
        publicMicrophoneElt.onclick = () => {
            if (!isSpeechActivated) {
                if (speechContent.length) {
                    setSpeechContent(speechContent + ' ');
                }
                recognition.start();
            } else {
                recognition.stop();
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
            setSpeechContent(speechContent + transcript);
        };
    }, [isSpeechActivated, speechContent]);

    useEffect(() => {
        if (isSpeechActivated) {
            setMessage(speechContent);
            document.querySelector('#send-message').value = speechContent;
        }
    }, [speechContent, setMessage, isSpeechActivated]);

    useEffect(() => {
        if(selectedUsername){
            recognition.stop();
        }
    }, [selectedUsername])

    return [
        isSpeechActivated,
        setIsSpeechActivated,
        setSpeechContent,
        isPrivateSpeech,
        setIsPrivateSpeech,
        privateSpeechContent,
        setPrivateSpeechContent,
    ];
};

export default useSpeech;