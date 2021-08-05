import React from 'react'
import Modal from 'react-modal'
import customStyles from '../utils/modal-style'

const ModalChoice = ({
    isOpen,
    setIsOpen,
    onSelectMessageToDelete,
    onDeleteMessage,
}) => {
    return (<Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
        <div className="modal-delete-message">
            <p className="center">Are you sure to delete this message ?</p>
            <div className="choice-delete-message">
                <button className="cancel-delete-message" onClick={() => {
                    setIsOpen(false)
                    onSelectMessageToDelete('')
                }}>No I don't want
                </button>
                <button className="confirm-delete-message" onClick={() => {
                    onDeleteMessage()
                    setIsOpen(false)
                }}>Sure !
                </button>
            </div>
        </div>
    </Modal>)
}

export default ModalChoice