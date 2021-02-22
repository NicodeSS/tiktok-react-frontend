import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import VideoFooter from "./Footer";
import VideoSidebar from "./Sidebar";
import {useInView} from "react-intersection-observer";

import "./index.css";

function Video({videoInfo, onLazyLoading, videoIdx}):JSX.Element {
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progressWidth, setProgressWidth] = useState<number>(0);
    const videoRef = useRef<any>(null);
    const videoProOut = useRef<any>(null); // 视频总进度条
    const videoPro = useRef<any>(null); // 视频进度条
    const videoPoi = useRef<any>(null); // 视频进度点
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

    // progress
    const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
        const percentage = 100 * videoRef.current.currentTime / videoRef.current.duration
        videoPro.current.style.width = percentage + '%';
        videoPoi.current.style.left = percentage - 1 + '%';
    };

    // Scroll state listener
    useEffect(():void => {
        if (inView) {
            videoRef.current.play();
            setPlaying(true);
            onLazyLoading(videoIdx);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }

    }, [inView]);

    useEffect(() => {
        setProgressWidth(videoProOut.current.clientWidth);
    }, []);

    const handleTouchMove = (e: any) => {
        let offsetX = e.touches[0].clientX - videoPoi.current.offsetWidth;
        if(offsetX<0){
            offsetX = 0;
        }else if(offsetX > progressWidth){
            offsetX = progressWidth;
        }
        // @ts-ignore
        let linex = (offsetX / progressWidth * 100).toFixed(1) * 1;
        videoPro.current.style.width = linex + '%';
        videoPoi.current.style.left = linex + '%';
        setCurrentTime(linex * videoRef.current.duration / 100);
    }

    const handleTouchEnd = () => {
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
    }

    const handleTouchStart = () => {
        videoRef.current.pause();
    }

    return (
        <div className="video" ref={ref}>
            <video
                className="video_player"
                loop
                playsInline
                webkit-playsinline={"true"}
                onClick={onVideoPress}
                ref={videoRef}
                src={videoInfo.videoUrl}
                poster={videoInfo.imgUrl}
                onTimeUpdate={onVideoTimeUpdate}
            />
        <div className="video_control">
            <div
                className="video_control-bg"
                    onTouchMove={handleTouchMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                <div 
                    className="all_video_progress"
                    ref={videoProOut}
                >
                    <span 
                    className="video_progress"
                    ref={videoPro}
                    ></span>
                    <span 
                    className="video_progress_point"
                    id="point"
                    ref={videoPoi}
                    onTouchMove={handleTouchMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    ></span>
                </div>
            </div>
        </div>

            <VideoFooter
                author_nick={videoInfo.author_nick}
                tagList={videoInfo.tagList}
                description={videoInfo.description}
                song={videoInfo.song}
                playing={playing}
            />

            <VideoSidebar
                _id={videoInfo._id}
                author_avatar={videoInfo.author_avatar}
                like={videoInfo.like}
                comment={videoInfo.comment}
                share={videoInfo.share}
            />
        </div>
    )
}

export default Video;
