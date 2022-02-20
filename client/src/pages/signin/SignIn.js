import React, { useState } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState(false);

    const validate = (e) => {
        if (!(name && room)) {
            e.preventDefault();
            setError(true);
        }
    };

    return (
        <div className="signin">
            <div className="join-chat">
                <p className='signin-header'>Join a chat room</p>
                <p className={error ? "hasError" : "hasNoError"}>You need to enter a username and room name.</p>
                <label htmlFor="input-username">
                    <input type="text" name="username" id="input-username"
                        placeholder="username"
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="input-room">
                    <input type="text" name="room" id="input-room"
                        placeholder="room"
                        onChange={(e) => setRoom(e.target.value)} />
                </label>
                <div className='submit-container'>
                    <Link to={`/chat?name=${name}&room=${room}`} onClick={validate} id="submit-user">
                        Join the room
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;