import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import VideoPage from "./views/Video"
import LivePage from "./views/Live"

import "./App.css"

function App() {
    return (
        <Router>
            <div className={"app"}>
                <Switch>
                    <Route exact path="/" component={VideoPage}/>
                    <Route path="/" component={LivePage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App