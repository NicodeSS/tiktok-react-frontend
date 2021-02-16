import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

import "./Live.css"


function Live({
                url,
                author,
                description,
                createdAt,
                updatedAt,
                like,
                comment,
                share,
               }) {
    const [playing, setPlaying] = useState<boolean>(false);
    const liveRef = useRef<any>(null);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

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
            <video
                className="live_player"
                playsInline
                autoPlay
                webkit-playsinline={"true"}
                onClick={onLivePress}
                ref={liveRef}
                src={url}
            >
            </video>
        </div>
    )
}

export default Live;