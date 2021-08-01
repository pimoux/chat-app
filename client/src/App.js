import React from 'react';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Chat from "./pages/chat/Chat";
import SignIn from "./pages/signin/SignIn";
import './global.css';

const App = () => {
    return (
        <Router>
            <Route exact path={"/"} component={SignIn} />
            <Route exact path={"/chat"} component={Chat} />
        </Router>
    )
}

export default App;