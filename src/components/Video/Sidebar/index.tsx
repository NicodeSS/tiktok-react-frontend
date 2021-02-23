import React, {useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import {video_like} from "../../../api/video";

import "./index.css";

interface Props {
    _id: string,
    author_avatar: string,
    like: number,
    comment: number,
    share: number
}

function VideoSidebar({_id, author_avatar, like, comment, share}: Props): JSX.Element {
    const [liked, setLiked] = useState<boolean>(false)
    const disc = './img/disc.png'

    const getShortenNumber = (x: number): string => {
        return x >= 10000 ? (x / 10000.0).toFixed(1) + "w" : x.toString()
    }

    const giveLike = async (id: string) => {
        try {
            let response = await video_like(id)
            setLiked(true)
        } catch (err) {
            console.error(err)
        }
    }

    const cancelLike = () => {
        setLiked(false)
    }

    return (
        <div>
            <div className="video-sidebar">
                <div className="video-sidebar-button">
                    <div className="video-sidebar-avatar">
                        <img src={author_avatar} alt="avatar"/>
                    </div>
                </div>
                <div className="video-sidebar-button">
                    {liked ? (
                        <FavoriteIcon
                            fontSize="large"
                            htmlColor={"red"}
                            onClick={() => cancelLike()}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="large"
                            onClick={() => giveLike(_id)}
                        />
                    )}
                    <p>{liked ? getShortenNumber(like + 1) : getShortenNumber(like)}</p>
                </div>
                <div className="video-sidebar-button">
                    <MessageIcon fontSize="large"/>
                    <p>{getShortenNumber(comment)}</p>
                </div>
                <div className="video-sidebar-button">
                    <ShareIcon fontSize="large"/>
                    <p>{getShortenNumber(share)}</p>
                </div>
            </div>
            <div className="record">
                <img className="video-sidebar-record" src={disc} alt="disc"/>
            </div>
        </div>
    )
}

export default VideoSidebar;