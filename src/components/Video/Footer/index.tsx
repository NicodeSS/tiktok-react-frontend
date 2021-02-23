import React from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";

import "./index.css";

interface Props {
    author_nick: string,
    tagList: Array<string>,
    description: string,
    song: string,
    playing: boolean
}

function VideoFooter({author_nick, tagList, description, song, playing}: Props): JSX.Element {
    return (
        <div className="video-footer">
            <div className="video-footer-text">
                <h3>@{author_nick}</h3>
                <strong>{("#" + tagList.join(" #"))}</strong>
                <p>{description}</p>
                <div className="video-footer-ticker">
                    <MusicNoteIcon className="video-footer-icon"/>
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
        </div>
    )
}

export default VideoFooter;