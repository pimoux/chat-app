import React from 'react'
import Modal from 'react-modal'
import customStyles from '../utils/modal-style'

const ModalDisconnect = ({ isOpen, setIsOpen }) => {
    return (<Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-disconnect">
            <p>The user has disconnected.&nbsp;
                <span className="underline pointer" onClick={() => setIsOpen(false)}>
                Click here
                </span>
                &nbsp;to come back to the main chat.</p>
        </div>
    </Modal>)
}

export default ModalDisconnect