import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import AuthorInfo from "./components/live/AuthorInfo";
import Description from "./components/live/Description";
import Comment from "./components/live/Comment";

import "./Live.css"


function Live({liveInfo}):JSX.Element {
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
            <AuthorInfo info={liveInfo}></AuthorInfo>
            <Description info={liveInfo}></Description>
            <Comment></Comment>
            <video
                className="live_player"
                playsInline
                autoPlay
                webkit-playsinline={"true"}
                onClick={onLivePress}
                ref={liveRef}
                src={liveInfo.playUrl}
            />

        </div>
    )
}

export default Live;
