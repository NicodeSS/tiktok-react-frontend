import React from "react";
import {Link} from "react-router-dom"
import getVideos from "../../api/video";
import Video from "../../components/Video";
import {VideoInfo} from '../../types/video'

import "./index.css"
import LiveTvIcon from "@material-ui/icons/LiveTv";

// modify limit of a page
const PAGELIMIT = 10;

class VideoPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            offset: 0
        };
        this.handleLazyLoading = this.handleLazyLoading.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await getVideos({limit: PAGELIMIT, offset: this.state.offset});
            const videos : Array<VideoInfo> = response.data.videos;
            this.setState({videos})
        } catch (error) {
            console.error(error)
            this.setState({videos: []})
        }
    }

    async handleLazyLoading(videoIdx) {
        if((videoIdx + 2) === this.state.videos.length) {
            const offset = this.state.offset + PAGELIMIT;
            const res = await getVideos({limit: PAGELIMIT, offset: offset});
            const resVideos = res.data.videos;
            const videos : Array<VideoInfo> = this.state.videos;
            this.setState({
                videos: videos.concat(resVideos),
                offset: offset
            });
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
                            this.state.videos.map((info: VideoInfo, index: number) => (
                                <li key={info._id}>
                                    <Video
                                        videoInfo={info}
                                        onLazyLoading={this.handleLazyLoading}
                                        videoIdx={index}
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