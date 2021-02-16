import React, {useEffect, useRef, useState} from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import {useInView} from "react-intersection-observer";

import "./Video.css";
// import Player from "xgplayer";
//
// class Video extends React.Component<any, any> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             playing: false,
//             _id: this.props._id,
//             url: this.props.url,
//             channel: this.props.channel,
//             description: this.props.channel,
//             song: this.props.song,
//             likes: this.props.likes,
//             messages: this.props.messages,
//             shares: this.props.shares
//         }
//     }
//
//     componentDidMount() {
//         let video_player = new Player({
//             id: "video_"+this.state._id,
//             url: this.state.url,
//             width:window.innerHeight/16*9,
//             height: window.innerHeight,
//             loop: true,
//             videoInit: true,
//         })
//     }
//
//     render(){
//         return (
//             <div className="video">
//
//                 <div id={"video_"+this.state._id}></div>
//                 <VideoFooter
//                     channel={this.state.channel}
//                     description={this.state.description}
//                     song={this.state.song}
//
//                     playing={this.state.playing}
//                 />
//                 <VideoSidebar
//                     likes={this.state.likes}
//                     messages={this.state.messages}
//                     shares={this.state.shares}
//                 />
//             </div>
//         )
//     }
// }


function Video({
                   _id,
                   url,
                   channel,
                   description,
                   song,
                   likes,
                   messages,
                   shares
               }) {
    const [playing, setPlaying] = useState<boolean>(false);
    const videoRef = useRef<any>(null);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });


    const onVideoPress = (e) => {
        e.preventDefault();
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    }

    useEffect(() => {
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
                src={url}
            />
            <VideoFooter
                channel={channel}
                description={description}
                song={song}

                playing={playing}
            />
            <VideoSidebar
                likes={likes}
                messages={messages}
                shares={shares}
            />
        </div>
    )
}

export default Video;