import React, {useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import {likeVideo} from "../../../api/video";

import "./index.css";


function VideoSidebar({_id, author_avatar, like, comment, share}): JSX.Element {
    const [liked, setLiked] = useState<boolean>(false)
    const disc = './img/disc.png'

    const getShortenNumber = (x: number): string => {
        return x >= 10000 ? (x / 10000.0).toFixed(1) + "w" : x.toString()
    }

    const giveLike = async (id: string) => {
        try {
            let response = await likeVideo(id)
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
            <div className="videoSidebar">
                <div className="videoSidebar_button">
                    <div className="videoSidebar_avatar">
                        <img src={author_avatar} alt="avatar"/>
                    </div>
                </div>
                <div className="videoSidebar_button">
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
                    )
                    }
                    <p>{liked ? getShortenNumber(like + 1) : getShortenNumber(like)}</p>
                </div>
                <div className="videoSidebar_button">
                    <MessageIcon fontSize="large"/>
                    <p>{getShortenNumber(comment)}</p>
                </div>
                <div className="videoSidebar_button">
                    <ShareIcon fontSize="large"/>
                    <p>{getShortenNumber(share)}</p>
                </div>
            </div>
            <div className="record">
                <img className="videoSidebar_record" src={disc} alt="disc"/>
            </div>
        </div>
    )
}

export default VideoSidebar;