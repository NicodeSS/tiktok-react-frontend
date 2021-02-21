import React from 'react'

import './WriteComment.css'

class WriteComment extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const writeComment = this.props.writeComment;
        this.state = {writeComment};
        this.index = this.props.index;
    }

    index = 0;
    commentInput;
    winHeight = 0;

    writeComment(ref:any,index){
        let writeComment = this.state.writeComment;
        writeComment = !writeComment;
        this.setState({writeComment})
        this.index = index;
    }

    componentDidMount() {

        // //初始化评论输入框状态
        // const length = this.state.lives.length;
        // let writeComment = new Array(length);
        // writeComment.fill(false);
        // this.setState({writeComment})

        //
        const root:any = document.querySelector("body")
        this.winHeight = window.outerHeight;
        if(root)
            root.style.minHeight = this.winHeight + "px";

        window.addEventListener('resize',()=>{


            if(window.outerHeight < this.winHeight)
            {
                let keyboardHeight = this.winHeight - window.outerHeight;
                const current = this.commentInput;
                if(current)
                    current.style.bottom = keyboardHeight + 50 + 'px';
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
                <div className="commentInput" ref={e => this.commentInput  = e}>
                    <input autoFocus={true} onBlur={(ref)=>this.writeComment(ref,this.index)}/>
                    <button onClick={(ref)=>this.writeComment(ref,this.index)}>确定</button>
                </div>
                :
                <div onClick={(ref)=>this.writeComment(ref,this.index)} className="writeComment">
                    说点什...
                </div>
        )
    }

}

export default WriteComment;
