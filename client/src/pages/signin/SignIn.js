import React, {useState} from 'react';
import './SignIn.css';
import {Link} from "react-router-dom";

const SignIn = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false);

    const handleChange = e => {
        setName(e.target.value);
    }

    const validate = (e) => {
        if (name) {
            setError(false)
        } else {
            e.preventDefault();
            setError(true);
        }
    }

    return (
        <div className='signin'>
            <div className="join-chat">
                <p className="chat-celeste">Bienvenue sur le chat céleste !</p>
                {error ? <p className="hasError">Vous devez renseigner un nom d'utilisateur</p> :
                    <p className="hasNotError">Vous devez renseigner un nom d'utilisateur</p>}
                <label htmlFor="input-username">
                    <input type='text' name="username" id="input-username" placeholder="username"
                           onChange={handleChange}/>
                </label>
                <Link to={`/chat?name=${name}`} onClick={validate}>
                    <button type="submit" id="submit-user">Rejoindre</button>
                </Link>
            </div>
        </div>
    )
}

export default SignIn;