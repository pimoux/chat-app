import React, { useContext, useState } from 'react'
import './UploadedFile.css'
import bytesToSize from '../../utils/bytes-conversion'
import ModalImage from '../../modals/ModalImage'
import ModalChoice from '../../modals/ModalChoice'
import ChatContext from '../../context/ChatContext'

const UploadedFile = ({message, name}) => {
    const { onSelectMessageToDelete } = useContext(ChatContext);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenChoice, setIsOpenChoice] = useState(false);
    const bytes = bytesToSize(message.fileInfo.size)
    const rightName = name.trim().toLowerCase()
    const messageSentByCurrentUser = message.user === rightName

    if (!message.private) {
        return (messageSentByCurrentUser ?
            <div className="message-container end">
                <div className="message current pointer" onClick={() => {
                    onSelectMessageToDelete(message);
                    setIsOpenChoice(true);
                }}>
                    <p className="message-text white">
                        <span className="image-info" onClick={() => {
                            setIsOpen(true);
                            setTimeout(() => setIsOpenChoice(false), 0);
                        }}>
                            {message.fileInfo.name} ({bytes})
                        </span>
                    </p>
                </div>
                <p className="date">{message.date}</p>
                <ModalImage url={message.url} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <ModalChoice isOpen={isOpenChoice} setIsOpen={setIsOpenChoice} />
            </div>
            :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other">
                    <p className="message-text dark">
                        <span className="image-info" onClick={() => setIsOpen(true)}>
                            {message.fileInfo.name} ({bytes})
                        </span>
                    </p>
                </div>
                <p className="username pl-2">{message.user}</p>
                <ModalImage url={message.url} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        )
    } else {
        return (messageSentByCurrentUser ?
            <div className="message-container end">
                <p className="username pr-2">to {message.recipient}</p>
                <div className="message current private pointer" onClick={() => {
                    onSelectMessageToDelete(message);
                    setIsOpenChoice(true);
                }}>
                    <p className="message-text white">
                        <span className="image-info" onClick={() => {
                            setIsOpen(true)
                            setTimeout(() => setIsOpenChoice(false), 0);
                        }}>
                            {message.fileInfo.name} ({bytes})
                        </span>
                    </p>
                </div>
                <p className="date">{message.date}</p>
                <ModalImage url={message.url} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <ModalChoice isOpen={isOpenChoice} setIsOpen={setIsOpenChoice} />
            </div>
            :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other private">
                    <p className="message-text dark">
                        <span className="image-info" onClick={() => setIsOpen(true)}>
                            {message.fileInfo.name} ({bytes})
                        </span>
                    </p>
                </div>
                <p className="username pl-2">from {message.user}</p>
                <ModalImage url={message.url} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        )
    }
}

export default UploadedFile