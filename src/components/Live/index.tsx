import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import AuthorInfo from "./Info/AuthorInfo";
import Description from "./Info/Description";
import DisplayComment from "./Comment/DisplayComment";

import "./index.css"


function Live({liveInfo, index}): JSX.Element {
    const [playing, setPlaying] = useState<boolean>(false);
    const liveRef = useRef<any>(null);
    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    // Click Event
    const onLivePress = (e) => {
        e.preventDefault();
        if (playing) {
            liveRef.current.pause();
            setPlaying(false);
        } else {
            liveRef.current.play();
            setPlaying(true);
        }
    }

    // Scroll Event Listener
    useEffect(() => {
        if (inView) {
            liveRef.current.play();
            setPlaying(true);
        } else {
            liveRef.current.pause();
            setPlaying(false);
        }

    }, [inView]);

    return (
        <div className="live" ref={ref}>
            <AuthorInfo info={liveInfo}/>
            <Description info={liveInfo}/>
            <video
                className="live_player"
                playsInline
                autoPlay
                webkit-playsinline={"true"}
                onClick={onLivePress}
                ref={liveRef}
                src={liveInfo.playUrl}
            />

            <DisplayComment
                id={liveInfo._id}
            />
        </div>
    )
}

export default Live;
