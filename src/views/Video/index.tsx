import React from "react";
import {Link} from "react-router-dom"
import getVideos from "../../api/video";
import Video from "../../Video";
import {VideoInfo} from '../../types/video'

import "./index.css"
import LiveTvIcon from "@material-ui/icons/LiveTv";

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
            <div className="videos_container">
                <Link to="/live">
                    <div className="live-btn">
                        <LiveTvIcon
                            fontSize={"large"}
                            htmlColor={"white"}
                        ></LiveTvIcon>
                    </div>
                </Link>
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
            </div>
        );
    }
}

export default VideoPage