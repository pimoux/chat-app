import React from 'react';
import './MessageList.css';
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';
import UploadedFile from "../UploadedFile/UploadedFile";

const MessageList = ({name, messages}) => {
    return (
        <ScrollToBottom className="text-zone">
            {messages.map((message, i) => {
                return message.type === 'text' ?
                    <Message message={message} name={name} key={i}/> :
                    <UploadedFile message={message} name={name} key={i}/>
            })}
        </ScrollToBottom>
    )
}

export default MessageList;