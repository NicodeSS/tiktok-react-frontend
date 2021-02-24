import React from 'react'
import {websocket_create} from '../../../api/live'
import WriteComment from "./WriteComment";

import './DisplayComment.css'
import LiveLike from "../Info/LiveLike";

interface Comment {
    userName: string;
    comment: string;
}

interface Props {
    _id: string
}

interface States {
    displayComment: Array<Comment>,
    scrollLock: boolean,
    unread: number,
}

class DisplayComment extends React.Component<Props, States> {
    private list: React.RefObject<unknown>;
    private comments: any;
    private ws: WebSocket;

    constructor(props: Props) {
        super(props);
        this.comments = [];
        this.list = React.createRef();
        this.state = {
            displayComment: [
                {userName: "测试用户1", comment: "测试评论测试评论测试评论测试评论测试评论测试评论测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论"},
                {userName: "测试用户1", comment: "测试评论测试评论测试评论测试评论测试评论测试评论测试评论"},
            ],
            scrollLock: false,
            unread: 3,
        };
        this.ws = websocket_create(props._id);
        this.ws.onmessage = (evt) => {
            this.comments.push(evt.data);

            // Cache, to avoid poping up too frequently
            let len: number = this.comments.length;
            if (len > 0) {
                const timer = setInterval((): void => {
                    this.setState({
                        displayComment: [...this.state.displayComment, {
                            userName: '匿名用户',
                            comment: this.comments.shift()
                        }]
                    });
                    len--;
                    if (this.state.scrollLock) this.setState({unread: this.state.unread + 1})
                    if (len === 0)
                        clearInterval(timer);
                }, 500);
            }
        }
        this.handleCommentAreaScroll = this.handleCommentAreaScroll.bind(this)
        this.handleUnreadClick = this.handleUnreadClick.bind(this)
    }

    getSnapshotBeforeUpdate(): number | null {
        const node: any = this.list.current;
        if ((node.offsetHeight + node.scrollTop) - node.scrollHeight > -0.5)
            return 0;
        return null;
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const node: any = this.list.current;
        let scrollDowned: boolean = Math.ceil(node.scrollTop) + node.offsetHeight >= node.scrollHeight;
        if (snapshot === 0)
            node.scrollTop = node.scrollHeight - node.offsetHeight;

        if (!this.state.scrollLock && !scrollDowned)
            node.scroll(0, Number.MAX_SAFE_INTEGER)
    }

    handleCommentAreaScroll(event: any): void {
        const node: any = this.list.current;
        let scrollDowned: boolean = Math.ceil(node.scrollTop) + node.offsetHeight >= node.scrollHeight;
        if (scrollDowned)
            this.setState({
                scrollLock: false,
                unread: 0
            })
        else
            this.setState({scrollLock: true})
    }

    handleUnreadClick(event: any): void {
        const node: any = this.list.current;
        let scrollDowned: boolean = node.scrollTop + node.offsetHeight >= node.scrollHeight;
        if (!scrollDowned)
            node.scroll(0, Number.MAX_SAFE_INTEGER)
    }

    render() {
        return (
            <div className="comment-area">
                <div className="comment-container">
                    <div className="comment-display" ref={this.list as React.RefObject<HTMLDivElement>}
                         onScroll={this.handleCommentAreaScroll}
                    >
                        {
                            this.state.displayComment.length > 0 &&
                            this.state.displayComment.map(({userName, comment}, index) =>
                                <div key={index}
                                     className={["comment-area-single", (index === this.state.displayComment.length - 1) ? "comment-slide" : null].join(' ')}>
                                    <p className="comment">
                                        <span className="username">{userName}: </span>{comment}
                                    </p>
                                </div>)
                        }
                    </div>
                    {this.state.unread > 0 &&
                    <div className="unread" onClick={this.handleUnreadClick}>
                        {this.state.unread}条新消息
                    </div>
                    }
                </div>
                <div className="comment-input">
                    <WriteComment ws={this.ws}/>
                    <LiveLike/>
                </div>
            </div>
        )
    }
}

export default DisplayComment;
