import React from "react";
import getVideos from "./api/video";
import Video from "./Video";
import {VideoInfo} from './types/video'

import "./VideoPage.css"

class VideoPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };
    }

    async componentDidMount() {
        try {
            let response = await getVideos();
            const videos : Array<VideoInfo> = response.data;
            this.setState({videos})
        } catch (error) {
            console.error(error)
            this.setState({videos: []})
        }
    }

    render(): JSX.Element {
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