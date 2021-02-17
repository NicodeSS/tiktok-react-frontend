import React, {useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import numeral from "numeral";

import "./VideoSidebar.css";

function VideoSidebar({ author_avatar, like, comment, share }):JSX.Element {
    const [liked, setLiked] = useState<boolean>(false);

    return (
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
                        onClick={():void => setLiked(false)}

                    />
                ) : (
                    <FavoriteBorderIcon
                        fontSize="large"
                        onClick={():void => setLiked(true)}
                    />
                )
                }
                <p>{liked ? numeral(like + 1).format("0.0a") : numeral(like).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <MessageIcon  fontSize="large" />
                <p>{numeral(comment).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <ShareIcon fontSize="large" />
                <p>{numeral(share).format("0.0a")}</p>
            </div>
        </div>
    )
}

export default VideoSidebar;