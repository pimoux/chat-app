import React from 'react'
import Modal from 'react-modal'
import customStyles from '../utils/modal-style'

const ModalImage = ({ url, isOpen, setIsOpen }) => {
    return <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
        <img src={url} alt="" className="image-file"/>
    </Modal>
}

export default ModalImage;