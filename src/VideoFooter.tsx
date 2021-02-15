import React from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";

import "./VideoFooter.css";

function VideoFooter({channel, description, song}) {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text">
                <h3>@{channel}</h3>
                <p>{description}</p>
                <div className="videoFooter_ticker">
                    <MusicNoteIcon className="videoFooter_icon"/>
                    <Ticker mode="smooth"
                    >
                        {() => (
                            <p>{song}</p>
                        )}
                    </Ticker>
                </div>
            </div>
            <img className="videoFooter_record" src="./disc.png" alt="disc"/>
        </div>
    )
}

export default VideoFooter;