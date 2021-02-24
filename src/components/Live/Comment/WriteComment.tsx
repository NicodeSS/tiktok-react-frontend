import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import './WriteComment.css'
import {IconButton} from "@material-ui/core";

interface Props {
    ws: WebSocket
}

interface States {
    focused: boolean
}

class WriteComment extends React.Component<Props, States> {
    private commentInput: any;
    private winHeight: number;
    private input: any;

    constructor(props:Props) {
        super(props);
        this.input = null;
        this.commentInput = null;
        this.winHeight = 0;
        this.state = {focused: false};

        this.handleInputClick = this.handleInputClick.bind(this)
        this.handleInputClose = this.handleInputClose.bind(this)
        this.sendComment = this.sendComment.bind(this)
    }

    handleInputClick(event: any):void {
        this.setState({focused: true})
    }


    handleInputClose(event: any):void {
        this.setState({focused: false})
    }

    sendComment(event: any):void {
        this.props.ws.send(this.input.value);
        this.handleInputClose({})
    }

    componentDidMount() {
        const root: any = document.querySelector("body")
        this.winHeight = window.outerHeight;
        if (root)
            root.style.minHeight = this.winHeight + "px";

        window.addEventListener('resize', () => {
            if (window.outerHeight >= this.winHeight){
                const input = document.querySelector('input')
                if (input)
                    input.blur();
            }
        })
    }

    render() {
        return (
            (this.state.focused) ?
                <div
                    className="comment-input-area"
                    ref={e => this.commentInput = e}
                >
                    <input
                        className="comment-input-dialog"
                        ref={input => this.input = input}
                        onBlur={this.handleInputClose}
                        autoFocus={true}
                        placeholder="说点什么..."
                    />
                    <IconButton
                        onMouseDown={this.sendComment}
                        className="comment-icon-send"
                    >
                        <SendIcon/>
                    </IconButton>
                </div>
                :
                <div onClick={this.handleInputClick} className="comment-input-div">
                    说点什么...
                </div>
        )
    }
}

export default WriteComment;
