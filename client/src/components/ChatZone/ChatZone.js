import React from 'react'
import InputZone from '../InputZone/InputZone'
import './ChatZone.css'
import ChatZoneHotbar from '../ChatZoneHotbar/ChatZoneHotbar'
import MessageList from '../MessageList/MessageList'

const ChatZone = ({
    onChangeMessage,
    onDeleteMessage,
    onSendMessage,
    onUploadFile,
    onSelectMessageToDelete,
    messages,
    name,
    isSpeechActivated
}) => {
    return (
      <div className="chat-zone">
          <ChatZoneHotbar/>
          <MessageList
            onDeleteMessage={onDeleteMessage}
            onSelectMessageToDelete={onSelectMessageToDelete}
            messages={messages}
            name={name}
          />
          <InputZone
            onChangeMessage={onChangeMessage}
            onSendMessage={onSendMessage}
            onUploadFile={onUploadFile}
            isSpeechActivated={isSpeechActivated}
          />
      </div>
    )
}

export default ChatZone