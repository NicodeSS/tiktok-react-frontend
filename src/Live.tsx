import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import AuthorInfo from "./components/live/Info/AuthorInfo";
import Description from "./components/live/Info/Description";
import LiveLike from "./components/live/Info/LiveLike"
import DisplayComment from "./components/live/Comment/DisplayComment";


import "./Live.css"


function Live({liveInfo,index}):JSX.Element {
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
            <video
                className="live_player"
                playsInline
                autoPlay
                webkit-playsinline={"true"}
                onClick={onLivePress}
                ref={liveRef}
                src={liveInfo.playUrl}/>

            <DisplayComment
                _id = {liveInfo._id}
            />
            <LiveLike/>
        </div>
    )
}

export default Live;
