import React from 'react'
import InputZone from '../InputZone/InputZone'
import './ChatZone.css'
import ChatZoneHotbar from '../ChatZoneHotbar/ChatZoneHotbar'
import MessageList from '../MessageList/MessageList'

const ChatZone = () => {
    return (
        <div className="chat-zone">
            <ChatZoneHotbar/>
            <MessageList/>
            <InputZone/>
        </div>
    )
}

export default ChatZone