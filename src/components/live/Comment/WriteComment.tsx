import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import './WriteComment.css'
import {IconButton} from "@material-ui/core";

class WriteComment extends React.Component<any, any> {
    private ws: any;
    private commentInput: any;
    private winHeight: number;
    private input: any;

    constructor(props) {
        super(props);
        this.input = null;
        this.commentInput = null;
        this.winHeight = 0;
        this.state = {focused: false};
        this.ws = props.ws;

        this.handleInputClick = this.handleInputClick.bind(this)
        this.handleInputClose = this.handleInputClose.bind(this)
        this.sendComment = this.sendComment.bind(this)
    }

    handleInputClick(event: any) {
        this.setState({focused: true})
    }


    handleInputClose(event: any) {
        this.setState({focused: false})
    }

    sendComment(event: any) {
        this.ws.send(this.input.value);
        this.handleInputClose({})
    }

    componentDidMount() {

        const root: any = document.querySelector("body")
        this.winHeight = window.outerHeight;
        if (root)
            root.style.minHeight = this.winHeight + "px";

        window.addEventListener('resize', () => {

            const current = this.commentInput;
            if (window.outerHeight < this.winHeight) {
                let keyboardHeight = this.winHeight - window.outerHeight;

                // if(current)
                //     current.style.bottom = 0 + 'px';
            } else {
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
                    className="commentInputArea"
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
                        className="sendCommentIcon"
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
