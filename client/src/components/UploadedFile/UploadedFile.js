import React, { useState } from 'react'
import './UploadedFile.css'
import bytesToSize from '../../utils/bytes-conversion'
import ModalImage from '../../modals/ModalImage'
import ModalChoice from '../../modals/ModalChoice'

const UploadedFile = ({
    message,
    name,
    onSelectMessageToDelete,
    onDeleteMessage,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenChoice, setIsOpenChoice] = useState(false);
    const bytes = bytesToSize(message.fileInfo.size)
    const rightName = name.trim().toLowerCase()
    const messageSentByCurrentUser = message.user === rightName

    if (!message.private) {
        return (messageSentByCurrentUser ?
            <div className="message-container end">
                <div className="message current" onClick={() => {
                    onSelectMessageToDelete(message);
                    setIsOpenChoice(true);
                }}>
                    <p className="message-text white">
                        Vous avez uploadé un fichier:
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
                <ModalChoice onDeleteMessage={onDeleteMessage}
                             onSelectMessageToDelete={onSelectMessageToDelete}
                             isOpen={isOpenChoice} setIsOpen={setIsOpenChoice} />
            </div>
            :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other">
                    <p className="message-text dark">
                        {message.user} a uploadé un fichier:
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
                <div className="message current private" onClick={() => {
                    onSelectMessageToDelete(message);
                    setIsOpenChoice(true);
                }}>
                    <p className="message-text white">
                        Vous avez envoyé un fichier privé à {message.recipient}:
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
                <ModalChoice onDeleteMessage={onDeleteMessage}
                             onSelectMessageToDelete={onSelectMessageToDelete}
                             isOpen={isOpenChoice} setIsOpen={setIsOpenChoice} />
            </div>
            :
            <div className="message-container start">
                <p className="date">{message.date}</p>
                <div className="message other private">
                    <p className="message-text dark">{message.user} vous a envoyé un fichier privé:
                        <span className="image-info" onClick={() => setIsOpen(true)}>
                            {message.fileInfo.name} ({bytes})
                        </span>
                    </p>
                </div>
                <ModalImage url={message.url} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        )
    }
}

export default UploadedFile