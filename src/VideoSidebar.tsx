import React, {useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import numeral from "numeral";

import "./VideoSidebar.css";

function VideoSidebar({ likes, shares, messages }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="videoSidebar">
            <div className="videoSidebar_button">
                {liked ? (
                    <FavoriteIcon
                        fontSize="large"
                        htmlColor={"red"}
                        onClick={() => setLiked(false)}

                    />
                ) : (
                    <FavoriteBorderIcon
                        fontSize="large"
                        onClick={() => setLiked(true)}
                    />
                )
                }
                <p>{liked ? numeral(likes + 1).format("0.0a") : numeral(likes).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <MessageIcon  fontSize="large" />
                <p>{numeral(messages).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <ShareIcon fontSize="large" />
                <p>{numeral(shares).format("0.0a")}</p>
            </div>
        </div>
    )
}

export default VideoSidebar;