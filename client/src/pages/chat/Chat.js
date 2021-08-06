import React from 'react';
import RoomListItem from '../../components/RoomListItem/RoomListItem';
import UserListItem from '../../components/UserListItem/UserListItem';
import ChatZone from '../../components/ChatZone/ChatZone';
import './Chat.css';
import useWebSockets from '../../hooks/useWebSockets';

const Chat = ({location}) => {

    const [
        name,
        selectedUsername,
        messages,
        users,
        isSpeechActivated,
        onChangeMessage,
        onChangePrivateMessage,
        onUploadFile,
        onPrivateUploadFile,
        onSendMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        onSelectUsername,
    ] = useWebSockets(location);

    return (
        <div className="chat">
            <RoomListItem/>
            <ChatZone
                onChangeMessage={onChangeMessage}
                onDeleteMessage={onDeleteMessage}
                onKeyPress={onSendMessage}
                onUploadFile={onUploadFile}
                onSelectMessageToDelete={onSelectMessageToDelete}
                messages={messages}
                name={name}
                isSpeechActivated={isSpeechActivated}
            />
            <UserListItem
                users={users}
                name={name}
                selectedUsername={selectedUsername}
                onChangeMessage={onChangePrivateMessage}
                onKeyPress={onSendPrivateMessage}
                onSelectUsername={onSelectUsername}
                onPrivateUploadFiles={onPrivateUploadFile}
            />
        </div>
    );
};

export default Chat;