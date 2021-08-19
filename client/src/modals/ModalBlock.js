import React, { useContext } from 'react'
import Modal from 'react-modal';
import customStyles from '../utils/modal-style';
import ChatContext from '../context/ChatContext'

const ModalBlock = ({
    isOpen,
    setIsOpen
}) => {

    const {handleBlock, selectedUsername} = useContext(ChatContext);

    return (<Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-block">
            <p>You blocked {selectedUsername}, you will not see his messages.&nbsp;
                <span onClick={() => {
                    handleBlock();
                    setIsOpen(false);
                }} className="underline pointer">Click here</span> to unblock this user</p>
        </div>
    </Modal>);
};

export default ModalBlock;