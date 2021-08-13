import React, { useContext } from 'react'
import './MessageList.css'
import Message from '../Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom'
import UploadedFile from '../UploadedFile/UploadedFile'
import ChatContext from '../../context/ChatContext'

const MessageList = () => {
    const { messages, name } = useContext(ChatContext);
    return (
      <ScrollToBottom className="text-zone">
          {messages.map((message, i) => {
              return message.type === 'text' ?
                <Message key={i} message={message} name={name}/> :
                <UploadedFile key={i} message={message} name={name}/>
          })}
      </ScrollToBottom>
    )
}

export default MessageList