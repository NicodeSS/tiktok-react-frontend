import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import AuthorInfo from "./Info/AuthorInfo";
import Description from "./Info/Description";
import DisplayComment from "./Comment/DisplayComment";

import "./index.css"
import {LiveInfo} from "../../types/live";
import Mask from "../Player/Mask";

interface Props {
    liveInfo: LiveInfo,
    index: number,
    onLazyLoading: any
}

function Live({liveInfo, index, onLazyLoading}: Props): JSX.Element {
    const [playing, setPlaying] = useState<boolean>(false);
    const liveRef = useRef<any>(null);
    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    // Click Event
    const onLivePress = (e): void => {
        e.preventDefault();
        try {
            let live = liveRef.current
            if (live.paused) {
                let playPromise = live.play()
                if (playPromise !== undefined)
                    playPromise.catch(() => console.log("Play Prevented"))
            } else {
                let pausePromise = live.pause()
                if (pausePromise !== undefined)
                    pausePromise.catch(() => console.log("Pause Prevented"))
            }
            setPlaying(!live.paused)
        } catch (err) {
            console.error(err)
        }
    }

    // Scroll Event Listener
    useEffect((): void => {
        try {
            onLazyLoading(index)
            let live = liveRef.current
            if (inView) {
                let playPromise = live.play()
                if (playPromise !== undefined)
                    playPromise.catch(() => console.log("Play Prevented"))
            } else {
                let pausePromise = live.pause()
                if (pausePromise !== undefined)
                    pausePromise.catch(() => console.log("Pause Prevented"))
            }
            setPlaying(!live.paused)
        } catch (err) {
            console.error(err)
        }

    }, [inView]);

    return (
        <div className="live" ref={ref}>
            {
                inView && liveRef.current && liveRef.current.paused &&
                <Mask/>
            }
            <AuthorInfo info={liveInfo}/>
            <Description info={liveInfo}/>
            <video
                className="live-player"
                playsInline
                // preload="none"
                webkit-playsinline={"true"}
                onClick={onLivePress}
                ref={liveRef}
                src={liveInfo.playUrl}
            />
            <DisplayComment
                _id={liveInfo._id}
            />
        </div>
    )
}

export default Live;
