import React from 'react';
import Modal from 'react-modal';
import customStyles from '../utils/modal-style';

const ModalBlock = ({
    isOpen,
    setIsOpen,
    selectedUsername,
    handleBlock,
}) => {
    return (<Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-block">
            <p>Vous avez bloqué {selectedUsername}, vous ne verrez donc aucun
                message de sa part. <span onClick={() => {
                    handleBlock();
                    setIsOpen(false);
                }} className="modal-close">Cliquez ici</span>&nbsp;pour
                débloquer cette personne </p>
        </div>
    </Modal>);
};

export default ModalBlock;