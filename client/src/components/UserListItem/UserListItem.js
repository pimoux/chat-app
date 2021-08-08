import React, {useState} from 'react';
import './UserListItem.css';
import ModalPrivateUser from '../../modals/ModalPrivateUser';

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
    setIsSpeechActivated
}) => {
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
                                    onSelectUsername(e);
                                }}>{user.name}</p>
                            </>)}
                    </div>
                );
            })}
            <ModalPrivateUser onChangePrivateMessage={onChangePrivateMessage}
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
            />
        </div>
    );
};

export default UserListItem;