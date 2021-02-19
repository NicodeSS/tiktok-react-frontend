import React, {useEffect, useRef, useState} from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import {useInView} from "react-intersection-observer";

import "./Video.css";

function Video({videoInfo}):JSX.Element {
    const [playing, setPlaying] = useState<boolean>(false);
    const videoRef = useRef<any>(null);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    // Click Event
    const onVideoPress = (e):void => {
        e.preventDefault();
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    }

    // Scroll state listener
    useEffect(():void => {
        if (inView) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }

    }, [inView]);

    return (
        <div className="video" ref={ref}>
            <video
                className="video_player"
                loop
                muted
                playsInline
                preload="auto"
                webkit-playsinline={"true"}
                autoPlay
                onClick={onVideoPress}
                ref={videoRef}
                src={videoInfo.videoUrl}
            />

            <VideoFooter
                author_nick={videoInfo.author_nick}
                tagList={videoInfo.tagList}
                description={videoInfo.description}
                song={videoInfo.song}
                playing={playing}
            />

            <VideoSidebar
                author_avatar={videoInfo.author_avatar}
                like={videoInfo.like}
                comment={videoInfo.comment}
                share={videoInfo.share}
            />
        </div>
    )
}

export default Video;