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
        setIsSpeechActivated,
        onChangeMessage,
        onChangePrivateMessage,
        onUploadFile,
        onPrivateUploadFile,
        onSendMessage,
        onSendPrivateMessage,
        onSelectMessageToDelete,
        onDeleteMessage,
        onSelectUsername,
        isPrivateSpeech,
        setIsPrivateSpeech,
        privateSpeechContent,
        setPrivateSpeechContent,
    ] = useWebSockets(location);

    return (
        <div className="chat">
            <RoomListItem/>
            <ChatZone
                messages={messages}
                name={name}
                isSpeechActivated={isSpeechActivated}
                onChangeMessage={onChangeMessage}
                onDeleteMessage={onDeleteMessage}
                onSendMessage={onSendMessage}
                onUploadFile={onUploadFile}
                onSelectMessageToDelete={onSelectMessageToDelete}
            />
            <UserListItem
                users={users}
                name={name}
                selectedUsername={selectedUsername}
                onChangePrivateMessage={onChangePrivateMessage}
                onSendPrivateMessage={onSendPrivateMessage}
                onSelectUsername={onSelectUsername}
                onPrivateUploadFiles={onPrivateUploadFile}
                isPrivateSpeech={isPrivateSpeech}
                setIsPrivateSpeech={setIsPrivateSpeech}
                privateSpeechContent={privateSpeechContent}
                setPrivateSpeechContent={setPrivateSpeechContent}
                setIsSpeechActivated={setIsSpeechActivated}
            />
        </div>
    );
};

export default Chat;