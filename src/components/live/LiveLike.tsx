import React from 'react'
import {getLiveLikeWs} from "../../api/live";
import './LiveLike.css'

import FavoriteIcon from '@material-ui/icons/Favorite';

class LiveLike extends React.Component<any, any>{
    private ws: WebSocket;
    constructor(props) {
        super(props);
        this.ws = getLiveLikeWs(props.id);
        this.state = {
            displayLike:[]
        };
        this.ws.onmessage = (evt)=>{
            console.log(evt.data);
            this.setState({displayLike:[...this.state.displayLike,1]})
        }
    }

    clickLike = ()=>{
        try{
            this.ws.send('1');
        }catch (e){
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <div className="moveArea">
                    {
                        this.state.displayLike.length > 0 && this.state.displayLike.map(()=>{
                            return (
                                <FavoriteIcon color="secondary" className={"heart heart" + Math.round(Math.random() * 10) % 3}/>
                            );
                        })
                    }
                </div>
                <div className="likeIcon" onMouseDown={this.clickLike}>
                    ❤
                </div>
            </>
        );
    }
}

export default LiveLike;
