import React, {useEffect, useState} from "react"
import getLives from "./api/live";
import Live from "./Live";
import AuthorInfo from "./components/live/AuthorInfo";
import Description from "./components/live/Description";
import Comment from "./components/live/Comment";

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
        getLives(this,{});
    }

    render():JSX.Element {
        return (
            <div className="app_lives">
                <ul>
                    {
                        this.state.lives.map((info: LiveInfo) => (
                            <li key={info._id}>
                                <AuthorInfo info={info}></AuthorInfo>
                                <Description info={info}></Description>
                                <Comment></Comment>
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