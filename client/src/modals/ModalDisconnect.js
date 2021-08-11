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
            <p>La personne s'est déconnecté.&nbsp;
                <span className="modal-close" onClick={() => setIsOpen(false)}>
                Cliquez ici
                </span>
                &nbsp;pour revenir à la zone de chat principale.</p>
        </div>
    </Modal>)
}

export default ModalDisconnect