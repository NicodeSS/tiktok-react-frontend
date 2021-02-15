import React, {useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import numeral from "numeral";

import "./VideoSidebar.css";
import putLike from "./api/video_operation";


function VideoSidebar({vid, like, likes, shares, messages}) {
    const [liked, setLiked] = useState(like);
    let giveLike = async () => {
        try {
            let response = await putLike(vid, !liked);
            setLiked(!liked)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="videoSidebar">
            <div className="videoSidebar_button">
                {liked ? (
                    <FavoriteIcon
                        fontSize="large"
                        htmlColor="red"
                        onClick={() => giveLike()}

                    />
                ) : (
                    <FavoriteBorderIcon
                        fontSize="large"
                        onClick={() => giveLike()}
                    />
                )
                }
                <p>{liked ? numeral(likes + 1).format("0.0a") : numeral(likes).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <MessageIcon fontSize="large"/>
                <p>{numeral(messages).format("0.0a")}</p>
            </div>
            <div className="videoSidebar_button">
                <ShareIcon fontSize="large"/>
                <p>{numeral(shares).format("0.0a")}</p>
            </div>
        </div>
    )
}

export default VideoSidebar;