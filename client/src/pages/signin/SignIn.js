import React, {useState} from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';

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
            <div className="credits">
                <h2>Realtime Chat Application
                    <span role="img" aria-label="emoji">💬</span>
                </h2>
                <h3>Created with React, Express, Node and Socket.IO
                    <span role="img" aria-label="emoji">❤️</span></h3>
                <h3>Huge thanks to <a href="https://www.youtube.com/channel/UCmXmlB4-HJytD7wek0Uo97A" target="_blank" rel="noreferrer">JS Mastery</a> for his tutorial on creating a chat app with socket.io. I resume his tutorial and added a lot of chat features. You can see his video <a href="https://www.youtube.com/watch?v=ZwFA3YMfkoc" target="_blank" rel="noreferrer"> here</a>.</h3>
                <h3>Try it out right now!
                    <span role="img" aria-label="emoji">⬇️️</span>
                </h3>
            </div>
            <div className="join-chat">
                <p className="chat-celeste">Welcome on the 5D chat !</p>
                {error ? <p className="hasError">You need to enter a username
                        and room name.</p> :
                    <p className="hasNotError">not visible</p>}
                <label htmlFor="input-username">
                    <input type="text" name="username" id="input-username"
                           placeholder="username"
                           onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="input-room">
                    <input type="text" name="room" id="input-room"
                           placeholder="room"
                           onChange={(e) => setRoom(e.target.value)}/>
                </label>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={validate}>
                    <button type="submit" id="submit-user" className="pointer">Join the room
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SignIn;