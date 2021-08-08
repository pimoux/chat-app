import React from 'react';
import Modal from 'react-modal';
import customStyles from '../utils/modal-style';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faPaperclip,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import usePrivateSpeech from '../hooks/usePrivateSpeech';

const ModalPrivateUser = ({
    isOpen,
    setIsOpen,
    selectedUsername,
    onPrivateUploadFiles,
    onChangePrivateMessage,
    onSendPrivateMessage,
    isPrivateSpeech,
    setIsPrivateSpeech,
    privateSpeechContent,
    setPrivateSpeechContent,
    onSelectUsername,
    setIsSpeechActivated
}) => {
    const [toggleSpeech, onRequestClose] = usePrivateSpeech(isPrivateSpeech, setIsPrivateSpeech,
        privateSpeechContent, setPrivateSpeechContent, isOpen, setIsOpen,
        onChangePrivateMessage, onSelectUsername, setIsSpeechActivated);
    return <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => onRequestClose()}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-user">
            <p>Send a private message to {selectedUsername}</p>
            <div className="private-actions">
                <label htmlFor="send-private-image">
                    <FontAwesomeIcon icon={faPaperclip}
                                     className="very-big-font"/>
                </label>
                <FontAwesomeIcon
                    icon={faMicrophone}
                    id="fa-microphone-private"
                    onClick={() => toggleSpeech()}
                    className={isPrivateSpeech
                        ? 'big-font ml-24 red'
                        : 'big-font ml-24'}/>
                <input
                    type="file"
                    name="send-private-image"
                    id="send-private-image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={(e) => onPrivateUploadFiles(e)}
                />
                <input
                    type="text"
                    id="send-private-message"
                    className="send-private-message"
                    onChange={(e) => onChangePrivateMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? onSendPrivateMessage(
                        e) : null}
                />
                <button type="submit"
                        onClick={(e) => onSendPrivateMessage(e)}>
                    <FontAwesomeIcon icon={faPaperPlane} className="big-font"/>
                </button>
            </div>
        </div>
    </Modal>;
};

export default ModalPrivateUser;