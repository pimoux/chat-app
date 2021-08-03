import React, {useState} from 'react';
import Modal from 'react-modal';
import './UploadedFile.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        display: 'flex',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
    },
};

function bytesToSize(bytes) {
    const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const UploadedFile = ({message, name}) => {
    const [isOpen, setIsOpen] = useState(false);
    const bytes = bytesToSize(message.fileInfo.size);
    const rightName = name.trim().toLowerCase();
    const messageSentByCurrentUser = message.user === rightName;
    if (!message.private) {
        return (messageSentByCurrentUser ?
                <div className="message-container end">
                    <div className="message current">
                        <p className="message-text white">
                            Vous avez uploadé un fichier: <span className="image-info"
                                                                onClick={() => setIsOpen(true)}>{message.fileInfo.name} ({bytes})</span>
                        </p>
                    </div>
                    <p className="date">{message.date}</p>
                    <Modal
                        isOpen={isOpen}
                        style={customStyles}
                        onRequestClose={() => setIsOpen(false)}
                        closeTimeoutMS={200}
                        ariaHideApp={false}
                    >
                        <img src={message.url} alt="" className="image-file"/>
                    </Modal>
                </div> :
                <div className="message-container start">
                    <p className="date">{message.date}</p>
                    <div className="message other">
                        <p className="message-text dark">{message.user} a uploadé un fichier: <span
                            className="image-info"
                            onClick={() => setIsOpen(true)}>{message.fileInfo.name} ({bytes})</span>
                        </p>
                    </div>
                    <p className="username pl-2">{message.user}</p>
                    <Modal
                        isOpen={isOpen}
                        style={customStyles}
                        onRequestClose={() => setIsOpen(false)}
                        closeTimeoutMS={200}
                        ariaHideApp={false}
                    >
                        <img src={message.url} alt="" className="image-file"/>
                    </Modal>
                </div>
        )
    } else {
        return (messageSentByCurrentUser ?
                <div className="message-container end">
                    <div className="message current private">
                        <p className="message-text white">
                            Vous avez envoyé un fichier privé à {message.recipient}: <span className="image-info"
                                                                                          onClick={() => setIsOpen(true)}>{message.fileInfo.name} ({bytes})</span>
                        </p>
                    </div>
                    <p className="date">{message.date}</p>
                    <Modal
                        isOpen={isOpen}
                        style={customStyles}
                        onRequestClose={() => setIsOpen(false)}
                        closeTimeoutMS={200}
                        ariaHideApp={false}
                    >
                        <img src={message.url} alt="" className="image-file"/>
                    </Modal>
                </div> :
                <div className="message-container start">
                    <p className="date">{message.date}</p>
                    <div className="message other private">
                        <p className="message-text dark">{message.user} vous a envoyé un fichier privé: <span
                            className="image-info"
                            onClick={() => setIsOpen(true)}>{message.fileInfo.name} ({bytes})</span>
                        </p>
                    </div>
                    <p className="username pl-2">{message.user}</p>
                    <Modal
                        isOpen={isOpen}
                        style={customStyles}
                        onRequestClose={() => setIsOpen(false)}
                        closeTimeoutMS={200}
                        ariaHideApp={false}
                    >
                        <img src={message.url} alt="" className="image-file"/>
                    </Modal>
                </div>
        )
    }
}

export default UploadedFile;