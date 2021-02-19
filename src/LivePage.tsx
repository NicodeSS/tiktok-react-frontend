import React, {useEffect, useState} from "react"
import getLives from "./api/live";
import Live from "./Live";

import "./LivePage.css"

interface LiveInfo {
    _id: string,
    author_id: string,
    author_nick: string,
    author_avatar: string,
    publishUrl: string,
    playUrl: string,
    description: string,
}

class LivePage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {lives: []};
    }
    
    componentDidMount() {
        // let response = getLives();
        // response.then(((data: unknown) => {
        //     let lives = data
        //     this.setState({lives: lives})
        // }))
        getLives(this,{});
    }

    render():JSX.Element {
        return (
            <div className="app_lives">
                <ul>
                    {
                        this.state.lives.map((info: LiveInfo) => (
                            <li key={info._id}>
                                <Live liveInfo={info}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default LivePage