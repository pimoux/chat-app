import React, {useState} from 'react';
import './UserListItem.css'
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        transition: '0.8s ease'
    },
};

const UserListItem = ({users, name, onChangeMessage, onKeyPress, onSelectUsername}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="user-list-item">
            <h3 className="user-title">Users ({users.length})</h3>
            {users.length > 0 && users.map((user, i) => {
                return (
                    <div key={i}>
                        {user.name === name ?
                            (<p className="user you" key={i}>{user.name}</p>) :
                            (<>
                                <p className="user" key={i} onClick={(e) => {
                                    setIsOpen(true);
                                    onSelectUsername(e)
                                }}>{user.name}</p>
                                <Modal
                                    isOpen={isOpen}
                                    style={customStyles}
                                    onRequestClose={() => setIsOpen(false)}
                                    closeTimeoutMS={200}
                                    ariaHideApp={false}
                                >
                                    <div>
                                        <p>Envoyer un message privé à {user.name}</p>
                                        <input
                                            type="text"
                                            className="send-private-message"
                                            onChange={(e) => onChangeMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' ? onKeyPress(e) : null}
                                        />
                                        <button type="submit"
                                                onClick={(e) => onKeyPress(e)}>
                                            <FontAwesomeIcon icon={faPaperPlane} /> Send
                                        </button>
                                    </div>
                                </Modal>
                            </>)}
                    </div>
                )
            })}
        </div>
    )
}

export default UserListItem;