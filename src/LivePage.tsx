import React from "react"
import getLives from "./api/live";
import Live from "./Live";
import AuthorInfo from "./components/live/AuthorInfo";
import Description from "./components/live/Description";
import Comment from "./components/live/Comment";
import {LiveInfo} from './types/live'


import "./LivePage.css"



class LivePage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {lives: []};
    }

    async componentDidMount() {
        try {
            let response = await getLives();
            let lives: Array<LiveInfo> = response.data
            this.setState({lives})
        } catch (error) {
            console.error(error)
            this.setState({lives: []})
        }
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