import React from 'react'
import {getComments} from './api/live'

import './Comment.css'


class Comment extends React.Component<any, any>{
    constructor(props) {
        super(props);

    }

    comments = [];
    list = React.createRef();
    state = {displayComment:[]};


    componentDidMount() {
        const id = this.props.id;
        getComments(this,id);
        let index = 0;
        const len = this.comments.length;
        console.log(this.comments);
        const timer = setInterval(()=>{
           this.setState({displayComment:[...this.state.displayComment,this.comments[index]]});
           index++;
           if(index == len)
               clearInterval(timer);
        },1000);
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
            <div className="commentArea" ref={this.list as React.RefObject<HTMLDivElement>}>
                {
                    // this.state.displayComment.map(({userName,comment},index)=>
                    //     <div key={index} className={["oneCommentArea",(index == this.state.displayComment.length - 1)?"commentSlide":null].join(' ')}>
                    //         <p className="comment">
                    //             <span className="username">{userName}: </span>{comment}
                    //         </p>
                    //     </div>)
                }

            </div>
        )
    }
}

export default Comment;
