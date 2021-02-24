import React from 'react'
import './index.css'

import FavoriteIcon from '@material-ui/icons/Favorite';

interface Props {
    ws: WebSocket
    onRef: any
}

interface States {
    displayLike: Array<any>
}

class LiveLike extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayLike: []
        };
        this.handleWsLike = this.handleWsLike.bind(this)
        this.clickLike = this.clickLike.bind(this)
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleWsLike() {
        this.setState({displayLike: [...this.state.displayLike, 1]})
    }

    clickLike() {
        try {
            this.props.ws.send(JSON.stringify({event: 2, data: ""}));
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="comment-like-area">
                <div className="moveArea">
                    {
                        this.state.displayLike.length > 0 && this.state.displayLike.map(() => {
                            return (
                                <FavoriteIcon color="secondary"
                                              className={"heart heart" + Math.round(Math.random() * 10) % 3}/>
                            );
                        })
                    }
                </div>
                <div className="likeIcon" onMouseDown={() => this.clickLike()}>
                    ❤
                </div>
            </div>
        );
    }
}

export default LiveLike;
