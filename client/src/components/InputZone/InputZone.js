import React, {useContext} from 'react';
import './InputZone.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPaperclip,
    faMicrophone,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import ChatContext from '../../context/ChatContext';

const InputZone = () => {

    const {
        setMessage,
        onSendMessage,
        onUploadFile,
        isSpeechActivated,
        publicToggleSpeech,
    } = useContext(ChatContext);

    return (
        <div className="input-zone">
            <div className="image-container">
                <label htmlFor="send-image">
                    <FontAwesomeIcon icon={faPaperclip} className="big-font"/>
                </label>
                <input
                    onChange={(e) => onUploadFile(e)}
                    type="file"
                    name="file"
                    id="send-image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
            </div>
            <FontAwesomeIcon
                icon={faMicrophone}
                onClick={() => publicToggleSpeech()}
                id="fa-microphone-public"
                className={isSpeechActivated
                    ? 'big-font ml-24 red'
                    : 'big-font ml-24'}/>
            <input
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onSendMessage(e) : null}
                type="text"
                name="message"
                id="send-message"
                placeholder="write a message..."
            />
            <div className="send-public-message-icon mobile">
                <FontAwesomeIcon icon={faPaperPlane} className="big-font"
                                 onClick={(e) => onSendMessage(e)}/>
            </div>
        </div>
    );
};

export default InputZone;