import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

import VideoFooter from "./Footer";
import VideoSidebar from "./Sidebar";
import {VideoInfo} from "../../types/video";

import "./index.css";
import Mask from "../Player/Mask";

interface Props {
    videoInfo: VideoInfo,
    onLazyLoading: any,
    index: number
}

function Video({videoInfo, onLazyLoading, index}: Props): JSX.Element {
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progressWidth, setProgressWidth] = useState<number>(0);
    const videoRef = useRef<any>(null);
    const videoProOut = useRef<any>(null); // 视频总进度条
    const videoPro = useRef<any>(null); // 视频进度条
    const videoPoi = useRef<any>(null); // 视频进度点
    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    // Click Event
    const onVideoPress = (e): void => {
        e.preventDefault();
        try {
            const video = videoRef.current
            if (video.paused) {
                let playPromise = video.play()
                if(playPromise !== undefined)
                    playPromise.catch(()=>console.log("Play Prevented"))
            } else {
                let pausePromise = video.pause()
                if(pausePromise !== undefined)
                    pausePromise.catch(()=>console.log("Pause Prevented"))
            }
            setPlaying(!video.paused)
        } catch (err) {
            console.error(err)
        }
    }

    // progress
    const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
        const percentage = 100 * videoRef.current.currentTime / videoRef.current.duration
        if (inView) {
            videoPro.current.style.width = percentage + '%';
            videoPoi.current.style.left = percentage - 1 + '%';
        }
    };

    // Scroll state listener
    useEffect((): void => {
        try {
            let video = videoRef.current
            if (inView) {
                onLazyLoading(index);
                let playPromise = video.play()
                if (playPromise !== undefined)
                    playPromise.catch(() => console.log("Play Prevented"))
            } else {
                let pausePromise = video.pause()
                if(pausePromise !== undefined)
                    pausePromise.catch(()=>console.log("Pause Prevented"))
            }
            setPlaying(!video.paused)
        } catch (err) {
            console.error(err)
        }

    }, [inView]);

    useEffect(() => {
        setProgressWidth(videoProOut.current.clientWidth);
    }, []);

    const handleTouchMove = (e: any) => {
        let offsetX = e.touches[0].clientX - videoPoi.current.offsetWidth;
        if (offsetX < 0) {
            offsetX = 0;
        } else if (offsetX > progressWidth) {
            offsetX = progressWidth;
        }

        let lineX = (offsetX * 100 / progressWidth).toFixed(1);
        videoPro.current.style.width = lineX + '%';
        videoPoi.current.style.left = lineX + '%';
        setCurrentTime(Number.parseFloat(lineX) * videoRef.current.duration / 100);
    }

    const handleTouchEnd = () => {
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();

        videoPro.current.style.backgroundColor = "#fff4";
        videoPoi.current.style.display = "none";
    }

    const handleTouchStart = () => {
        videoRef.current.pause();
        videoPro.current.style.backgroundColor = "#fff";
        videoPoi.current.style.display = "inline-block";
    }

    return (
        <div className="video" ref={ref}>
            {
                inView && videoRef.current && videoRef.current.paused &&
                <Mask/>
            }
            <video
                className="video-player"
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
                    />
                        <span
                            className="video_progress_point"
                            id="point"
                            ref={videoPoi}
                            onTouchMove={handleTouchMove}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        />
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
