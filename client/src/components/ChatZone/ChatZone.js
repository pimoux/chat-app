import React from 'react';
import InputZone from "../InputZone/InputZone";
import './ChatZone.css';
import ChatZoneHotbar from "../ChatZoneHotbar/ChatZoneHotbar";
import MessageList from "../MessageList/MessageList";

const ChatZone = ({onChangeMessage, onKeyPress, onUploadFile, messages, name}) => {
    return (
        <div className="chat-zone">
            <ChatZoneHotbar/>
            <MessageList
                messages={messages}
                name={name}
            />
            <InputZone
                onChangeMessage={onChangeMessage}
                onKeyPress={onKeyPress}
                onUploadFile={onUploadFile}
            />
        </div>
    )
}

export default ChatZone;