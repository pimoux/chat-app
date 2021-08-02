import React from 'react';
import './InputZone.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";

const InputZone = ({onChangeMessage, onKeyPress, onUploadFile}) => {

    return (
        <div className="input-zone">
            <div className="image-container">
                <label htmlFor="send-image">
                    <FontAwesomeIcon icon={faPaperclip} className="big-font"/>
                </label>
                <input
                    onChange={(e) => onUploadFile(e)}
                    type="file"
                    name="file"
                    id="send-image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
            </div>
            <input
                onChange={(e) => onChangeMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onKeyPress(e) : null}
                type="text"
                name="message"
                id="send-message"
                placeholder="write a message..."
            />
        </div>
    )
}

export default InputZone;