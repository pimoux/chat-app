import React, { useContext, useState } from 'react'
import './UserListItem.css'
import ModalPrivateUser from '../../modals/ModalPrivateUser'
import ModalBlock from '../../modals/ModalBlock'
import ModalDisconnect from '../../modals/ModalDisconnect'
import ChatContext from '../../context/ChatContext'

const UserListItem = () => {
    const { users, name, onSelectUsername,
        selectedUsername } = useContext(ChatContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="user-list-item">
            <h3 className="user-title">Users ({users.length})</h3>
            {users.length > 0 && users.map((user, i) => {
                return (
                    <div key={i}>
                        {user.name === name ?
                            (<p className="user you">{user.name}</p>) :
                            (<p className={user.acceptMessagesBy.find(
                                username => username === name) ?
                                'user' : 'user blocked'}
                                onClick={(e) => {
                                    setIsOpen(true)
                                    onSelectUsername(e)
                                }}>{user.name}</p>)}
                    </div>
                )
            })}
            {selectedUsername ?
                users.find(user => user.name === selectedUsername)
                .acceptMessagesBy
                .find(username => username === name) ?
                    <ModalPrivateUser isOpen={isOpen} setIsOpen={setIsOpen}/> :
                    <ModalBlock isOpen={isOpen} setIsOpen={setIsOpen}/> :
                <ModalDisconnect isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </div>
    )
}

export default UserListItem