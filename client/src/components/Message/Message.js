import React, { useContext, useState } from 'react'
import './Message.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ModalChoice from '../../modals/ModalChoice'
import ChatContext from '../../context/ChatContext'

const Message = ({message, name}) => {
    const {
        onSelectMessageToDelete,
        onDeleteMessage
    } = useContext(ChatContext);

    const [isOpen, setIsOpen] = useState(false)
    const rightName = name.trim().toLowerCase()
    const messageSentByCurrentUser = message.user === rightName
    if (!message.private) {
        return (messageSentByCurrentUser ?
            <>
                <div className="message-container end">
                    <div className="message current" onClick={() => {
                        onSelectMessageToDelete(message)
                        setIsOpen(true)
                    }}>
                        <p className="message-text white">{message.text}</p>
                    </div>
                    <p className="date">{message.date}</p>
                </div>
                <ModalChoice isOpen={isOpen} setIsOpen={setIsOpen}
                             onDeleteMessage={onDeleteMessage}
                             onSelectMessageToDelete={onSelectMessageToDelete}
                />
            </>
            :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other">
                    <p className="message-text dark">{message.text}</p>
                </div>
                <p className="username pl-2">{message.user}</p>
            </div>
        )
    } else {
        return (messageSentByCurrentUser ?
            <div className="message-container end">
                <p className="username pr-2">to {message.recipient}</p>
                <div className="message current private" onClick={() => {
                    onSelectMessageToDelete(message)
                    setIsOpen(true);
                }}>
                    <p className="message-text white">
                        {message.text} &nbsp;
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </p>
                </div>
                <p className="date">{message.date}</p>
                <ModalChoice isOpen={isOpen} setIsOpen={setIsOpen}
                             onDeleteMessage={onDeleteMessage}
                             onSelectMessageToDelete={onSelectMessageToDelete}
                />
            </div> :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other private">
                    <p className="message-text dark">
                        <FontAwesomeIcon icon={faEnvelope}/> &nbsp;
                        {message.text}
                    </p>
                </div>
                <p className="username pl-2">{message.user} whispers to you</p>
            </div>
        )
    }
}

export default Message