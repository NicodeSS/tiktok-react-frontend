import React from "react"
import {Link} from "react-router-dom"
import {lives_list} from "../../api/live";
import Live from "../../components/Live";
import {LiveInfo} from '../../types/live'

import "./index.css"
import CloseIcon from "@material-ui/icons/Close";


interface Props {
}

interface States {
    lives: Array<LiveInfo>
}

const PAGE_LIMIT = 3

class LivePage extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {lives: []};
        this.handleLazyLoading = this.handleLazyLoading.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await lives_list({limit: PAGE_LIMIT, offset: 0});
            let lives: Array<LiveInfo> = response.data.lives
            this.setState({lives})
        } catch (error) {
            console.error(error)
            this.setState({lives: []})
        }
    }

    async handleLazyLoading(index: number) {
        if ((index + 2) === this.state.lives.length) {
            try {
                const offset = this.state.lives.length
                let response = await lives_list({limit: PAGE_LIMIT, offset: offset})
                let lives: Array<LiveInfo> = response.data.lives
                lives = this.state.lives.concat(lives)
                this.setState({
                    lives
                })
            } catch (err) {
                console.error(err)
            }
        }
    }


    render(): JSX.Element {
        return (
            <div className="lives-container">
                <Link to="/">
                    <div className="lives-btn-close">
                        <CloseIcon
                            fontSize={"large"}
                            htmlColor={"white"}
                        />
                    </div>
                </Link>
                <div className="lives">
                    <ul>
                        {
                            this.state.lives.map((info: LiveInfo, index: number) => (
                                <li key={info._id}>
                                    <Live liveInfo={info} index={index} onLazyLoading={this.handleLazyLoading}/>
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
