import React, {useState} from 'react';
import './UserListItem.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UserListItem = ({users, name}) => {
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
                                <p className="user" key={i} onClick={() => setIsOpen(true)}>{user.name}</p>
                                <Modal
                                    isOpen={isOpen}
                                    style={customStyles}
                                    onRequestClose={() => setIsOpen(false)}
                                >
                                    <p>ca marche</p>
                                </Modal>
                            </>)}
                    </div>
                )
            })}
        </div>
    )
}

export default UserListItem;