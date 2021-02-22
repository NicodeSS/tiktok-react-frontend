import React from "react"
import {Link} from "react-router-dom"
import {getLives} from "../../api/live";
import Live from "../../Live";
import {LiveInfo} from '../../types/live'

import "./index.css"
import CloseIcon from "@material-ui/icons/Close";

class LivePage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {lives: []};
    }

    async componentDidMount() {
        try {
            let response = await getLives();
            let lives: Array<LiveInfo> = response.data.lives
            this.setState({lives})
        } catch (error) {
            console.error(error)
            this.setState({lives: []})
        }
    }

    render():JSX.Element {
        return (
            <div className="lives_container">
                <Link to="/">
                    <div className="close-btn">
                        <CloseIcon
                            fontSize={"large"}
                            htmlColor={"white"}
                        ></CloseIcon>
                    </div>
                </Link>
                <div className="app_lives">
                    <ul>
                        {
                            this.state.lives.map((info: LiveInfo,index) => (
                                <li key={info._id}>
                                    <Live liveInfo={info} index={index}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default LivePage
