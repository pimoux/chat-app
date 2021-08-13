import React, {useContext} from 'react';
import Modal from 'react-modal';
import customStyles from '../utils/modal-style';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBan,
    faMicrophone,
    faPaperclip,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import usePrivateSpeech from '../hooks/speech/usePrivateSpeech';
import ChatContext from '../context/ChatContext';

const ModalPrivateUser = ({isOpen, setIsOpen}) => {
    const {
        selectedUsername,
        onPrivateUploadFile,
        setPrivateMessage,
        onSendPrivateMessage,
        isPrivateSpeech,
        handleBlock,
    } = useContext(ChatContext);
    const [toggleSpeech, onRequestClose] = usePrivateSpeech(isOpen, setIsOpen);
    return <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => onRequestClose()}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-user">
            <div className="private-title-container">
                <p className="private-title">Send a private message
                    to {selectedUsername} &nbsp;
                </p>
                <div className="ban-container"
                     onClick={() => {
                         handleBlock();
                         setIsOpen(false);
                     }}>
                    <FontAwesomeIcon icon={faBan} className="ban"/>
                </div>
            </div>
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
                    onChange={(e) => onPrivateUploadFile(e)}
                />
                <input
                    type="text"
                    id="send-private-message"
                    className="send-private-message"
                    onChange={(e) => setPrivateMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? onSendPrivateMessage(
                        e) : null}
                />
                <button type="submit" className="mobile"
                        onClick={(e) => onSendPrivateMessage(e)}>
                    <FontAwesomeIcon icon={faPaperPlane} className="big-font"/>
                </button>
            </div>
        </div>
    </Modal>;
};

export default ModalPrivateUser;