import React from "react";
import getVideos from "./api/video";
import Video from "./Video";

import "./VideoPage.css"

export interface VideoInfo {
    _id: string,
    videoUrl: string,
    imgUrl: string,
    author_nick: string,
    author_avatar: string,
    author_id: string,
    description: string,
    tagList: Array<string>
    song: string,
    createdAt: string,
    updatedAt: string,
    like: number,
    comment: number,
    share: number
}

class VideoPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };
    }

    componentDidMount() {
        getVideos(this,{})
    }

    render():JSX.Element {
        return (
            <div className="app_videos">
                <ul>
                    {
                        this.state.videos.map((info: VideoInfo) => (
                            <li key={info._id}>
                                <Video
                                    videoInfo={info}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default VideoPage