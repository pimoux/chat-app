import React from 'react';
import './MessageList.css';
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageList = ({name, messages}) => {
    return (
        <ScrollToBottom className="text-zone">
            {messages.map((message, i) => <Message message={message} name={name} key={i}/>)}
        </ScrollToBottom>
    )
}

export default MessageList;