import React from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";

import "./VideoFooter.css";

const disc = './img/disc.png';

function VideoFooter({author_nick, tagList, description, song, playing}):JSX.Element {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text">
                <h3>@{author_nick}</h3>
                <strong>{("#" + tagList.join(" #"))}</strong>
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