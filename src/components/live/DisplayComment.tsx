import React from 'react'
import {getCommentsWS} from '../../api/live'

import './DisplayComment.css'
import WriteComment from "./WriteComment";

interface CommentApi{
    userName:string;
    comment:string;
}

class DisplayComment extends React.Component<any, any>{
    private list: React.RefObject<unknown>;
    private comments: any;
    private ws: WebSocket;
    constructor(props) {
        super(props);
        this.comments = [];
        this.list = React.createRef();
        this.state = {displayComment:[]};
        this.ws = getCommentsWS(props.id);
        this.ws.onmessage = (evt)=>{
            this.comments.push(evt.data);
            let len = this.comments.length;
            if(len > 0){
                const timer = setInterval(()=>{
                    this.setState({displayComment:[...this.state.displayComment,{userName:'匿名用户',comment:this.comments.shift()}]});
                    len--;
                    if(len == 0)
                        clearInterval(timer);
                },1000);
            }
        }
    }

    getSnapshotBeforeUpdate() {
        const node:any = this.list.current;
        if((node.offsetHeight + node.scrollTop) - node.scrollHeight > -0.5){
            return 0;
        }

        return null;
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        const node:any = this.list.current;
        if(snapshot == 0)
            node.scrollTop = node.scrollHeight - node.offsetHeight;

    }

    render(){
        return (
            <>
                <div className="commentDisplay" ref={this.list as React.RefObject<HTMLDivElement>}>
                    {(this.state.displayComment.length > 0)?
                        this.state.displayComment.map(({userName, comment}, index) =>
                        <div key={index}
                             className={["oneCommentArea", (index == this.state.displayComment.length - 1) ? "commentSlide" : null].join(' ')}>
                            <p className="comment">
                                <span className="username">{userName}: </span>{comment}
                            </p>
                        </div>)
                        :
                        <></>
                    }
                </div>

                <WriteComment ws={this.ws}/>
            </>
        )
    }
}

export default DisplayComment;
