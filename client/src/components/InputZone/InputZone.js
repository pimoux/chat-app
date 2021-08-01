import React from 'react';
import './InputZone.css';

const InputZone = ({onChangeMessage, onKeyPress}) => {

    return (
        <div className="input-zone">
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