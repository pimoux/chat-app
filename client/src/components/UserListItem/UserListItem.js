import React, { useState } from 'react'
import './UserListItem.css'
import ModalPrivateUser from '../../modals/ModalPrivateUser'
import ModalBlock from '../../modals/ModalBlock'
import ModalDisconnect from '../../modals/ModalDisconnect'

const UserListItem = ({
    users,
    name,
    onChangePrivateMessage,
    onSendPrivateMessage,
    onSelectUsername,
    onPrivateUploadFiles,
    selectedUsername,
    isPrivateSpeech,
    setIsPrivateSpeech,
    privateSpeechContent,
    setPrivateSpeechContent,
    setIsSpeechActivated,
    handleBlock
}) => {
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
                <ModalPrivateUser
                    onChangePrivateMessage={onChangePrivateMessage}
                    onSendPrivateMessage={onSendPrivateMessage}
                    onPrivateUploadFiles={onPrivateUploadFiles}
                    onSelectUsername={onSelectUsername}
                    selectedUsername={selectedUsername}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    isPrivateSpeech={isPrivateSpeech}
                    setIsPrivateSpeech={setIsPrivateSpeech}
                    privateSpeechContent={privateSpeechContent}
                    setPrivateSpeechContent={setPrivateSpeechContent}
                    setIsSpeechActivated={setIsSpeechActivated}
                    handleBlock={handleBlock}
                /> :
                <ModalBlock isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            handleBlock={handleBlock}
                            selectedUsername={selectedUsername}
                /> :
                <ModalDisconnect isOpen={isOpen} setIsOpen={setIsOpen} />
            }
        </div>
    )
}

export default UserListItem;