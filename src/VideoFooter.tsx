import React from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";

import "./VideoFooter.css";

const disc = require('./disc.png')

function VideoFooter({channel, description, song, playing}) {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text">
                <h3>@{channel}</h3>
                <p>{description}</p>
                <div className="videoFooter_ticker">
                    <MusicNoteIcon className="videoFooter_icon"/>
                    <Ticker
                        mode="smooth"
                        move={playing}
                    >
                        {() => (
                            <p>{song}</p>
                        )}
                    </Ticker>
                </div>
            </div>
            <img className="videoFooter_record" src={disc} alt="disc" />
        </div>
    )
}

export default VideoFooter;