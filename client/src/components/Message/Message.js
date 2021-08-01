import React from 'react';
import './Message.css';

const Message = ({message, name}) => {
    const rightName = name.trim().toLowerCase();
    const messageSentByCurrentUser = message.user === rightName;
    return (messageSentByCurrentUser ?
            <div className="message-container end">
                <p className="username pr-2">{message.user}</p>
                <div className="message current">
                    <p className="message-text white">{message.text}</p>
                </div>
                <p className="date">{message.date}</p>
            </div> :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other">
                    <p className="message-text dark">{message.text}</p>
                </div>
                <p className="username pl-2">{message.user}</p>
            </div>
    )
}

export default Message;