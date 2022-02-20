import React, {useContext, useState} from 'react';
import './UserListItem.css';
import ModalPrivateUser from '../../modals/ModalPrivateUser';
import ModalBlock from '../../modals/ModalBlock';
import ModalDisconnect from '../../modals/ModalDisconnect';
import ChatContext from '../../context/ChatContext';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {closeRoomList, closeUserList} from '../../utils/sidebars';

const UserListItem = () => {
    const { users, name, onSelectUsername, selectedUsername, logout } = useContext(ChatContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="user-list-item">
            <h3 className="user-title desktop">Users ({users.length})</h3>
            <div className="user-title-mobile">
                <FontAwesomeIcon icon={faArrowRight}
                                 className="big-font mobile"
                                 onClick={() => closeUserList()}/>
                <h3 className="user-title mobile">Users ({users.length})</h3>
            </div>
            {users.length > 0 && users.map((user, i) => {
                return (
                    <div key={i}>
                        {user.name === name ?
                            (<p className="underline">{user.name}</p>) :
                            (<p className={user.acceptMessagesBy.find(
                                username => username === name) ?
                                'pointer' : 'blocked pointer'}
                                onClick={(e) => {
                                    setIsOpen(true);
                                    if(window.innerWidth < 640){
                                        closeUserList();
                                        closeRoomList();
                                    }
                                    onSelectUsername(e);
                                }}>{user.name}</p>)}
                    </div>
                );
            })}
            <Link to="/" className="logout">
                <FontAwesomeIcon icon={faSignOutAlt}
                                 className="big-font red logout-icon pointer"
                                 onClick={() => logout()}/>
            </Link>
            {selectedUsername ?
                users.find(user => user.name === selectedUsername)
                .acceptMessagesBy
                .find(username => username === name) ?
                    <ModalPrivateUser isOpen={isOpen} setIsOpen={setIsOpen}/> :
                    <ModalBlock isOpen={isOpen} setIsOpen={setIsOpen}/> :
                <ModalDisconnect isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </div>
    );
};

export default UserListItem;