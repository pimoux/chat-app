import Modal from 'react-modal';
import customStyles from '../utils/modal-style';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import ChatContext from '../context/ChatContext';

const ModalChangeRoom = ({isOpen, setIsOpen, nextRoom, resetSelectedRoom}) => {
    const {name, onChangeRoom} = useContext(ChatContext);
    return (<Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => {
            setIsOpen(false);
            resetSelectedRoom();
        }}
        closeTimeoutMS={200}
        ariaHideApp={false}
    >
        <div className="modal-change-room">
            <p>Êtes vous sûr de rejoindre le salon {nextRoom} ?</p>
            <div className="choice-change-room">
                <button className="cancel" onClick={() => {
                    setIsOpen(false);
                    resetSelectedRoom();
                }}>
                    Non
                </button>
                <Link to={`/chat?name=${name}&room=${nextRoom}`}>
                    <button className="confirm"
                            onClick={() => {
                                setIsOpen(false)
                                onChangeRoom(nextRoom)
                                resetSelectedRoom();
                            }}>
                        Oui
                    </button>
                </Link>
            </div>
        </div>
    </Modal>);
};

export default ModalChangeRoom;