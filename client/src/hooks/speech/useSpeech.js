import {useCallback, useEffect} from 'react';

let recognition;

const useSpeech = (
    isSpeechActivated,
    setIsSpeechActivated,
    speechContent,
    setSpeechContent,
    setMessage,
    selectedUsername
) => {

    const memoizedAffectSpeech = useCallback(() => {
        setMessage(speechContent);
        document.querySelector('#send-message').value = speechContent;
    }, [setMessage, speechContent]);

    const memoizedConcatSpeechAndTranscript = useCallback((e) => {
        let current = e.resultIndex;
        let transcript = e.results[current][0].transcript;
        setSpeechContent(speechContent + transcript);
    }, [speechContent, setSpeechContent])

    const publicToggleSpeech = () => {
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

    useEffect(() => {
        let speechRecognition = window.webkitSpeechRecognition;
        recognition = new speechRecognition();
        recognition.continuous = true;
    }, []);

    useEffect(() => {
        recognition.error = () => {
            console.log('une erreur est survenue');
        };

        recognition.lang = 'fr-FR';

        recognition.onresult = (e) => {
            memoizedConcatSpeechAndTranscript(e);
        };
    }, [isSpeechActivated, speechContent, memoizedConcatSpeechAndTranscript]);

    useEffect(() => {
        if (isSpeechActivated) {
            memoizedAffectSpeech();
        }
    }, [isSpeechActivated, memoizedAffectSpeech]);

    useEffect(() => {
        if (selectedUsername) {
            recognition.stop();
        }
    }, [selectedUsername]);

    return [publicToggleSpeech];
}

export default useSpeech;