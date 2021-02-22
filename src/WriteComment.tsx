import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import './WriteComment.css'

class WriteComment extends React.Component<any, any> {
    private ws: any;
    private commentInput: any;
    private winHeight: number;
    private input:any;
    constructor(props) {
        super(props);
        this.input = null;
        this.commentInput = null;
        this.winHeight = 0;
        this.state = {writeComment:false};
        this.ws = props.ws;
    }

    writeComment(ref:any){
        let writeComment = this.state.writeComment;
        writeComment = !writeComment;
        this.setState({writeComment})
    }

    sendComment(ref:any){
        console.log(this.input.value);
        this.ws.send(this.input.value);
    }

    componentDidMount() {

        const root:any = document.querySelector("body")
        this.winHeight = window.outerHeight;
        if(root)
            root.style.minHeight = this.winHeight + "px";

        window.addEventListener('resize',()=>{

            const current = this.commentInput;
            if(window.outerHeight < this.winHeight)
            {
                let keyboardHeight = this.winHeight - window.outerHeight;

                // if(current)
                //     current.style.bottom = 0 + 'px';
            }
            else
            {
                const input = document.querySelector('input')
                if(input)
                    input.blur();
            }
        })
    }

    render(){
        return (
            (this.state.writeComment)?
                <div className="commentInputArea" ref={e => this.commentInput  = e}>
                    <input className="commentInput" ref={input => this.input = input} autoFocus={true} onBlur={(ref)=>this.writeComment(ref)} placeholder="说点什么。。。"/>
                    <SendIcon className="sendCommentIcon" onMouseDown={(ref)=>this.sendComment(ref)}/>
                </div>
                :
                <div onClick={(ref)=>this.writeComment(ref)} className="writeComment">
                    说点什...
                </div>
        )
    }

}

export default WriteComment;
