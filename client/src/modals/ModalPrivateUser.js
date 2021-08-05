import React from 'react'
import Modal from 'react-modal'
import customStyles from '../utils/modal-style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ModalPrivateUser = ({
    isOpen,
    setIsOpen,
    selectedUsername,
    onPrivateUploadFiles,
    onChangeMessage,
    onKeyPress,
}) => {
    return <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
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
                <input
                  type="file"
                  name="send-private-image"
                  id="send-private-image"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={(e) => onPrivateUploadFiles(e)}
                />
                <input
                  type="text"
                  className="send-private-message"
                  onChange={(e) => onChangeMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' ? onKeyPress(e) : null}
                />
                <button type="submit"
                        onClick={(e) => onKeyPress(e)}>
                    <FontAwesomeIcon icon={faPaperPlane} className="big-font"/>
                </button>
            </div>
        </div>
    </Modal>
}

export default ModalPrivateUser