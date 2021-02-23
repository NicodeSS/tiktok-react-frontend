import React from "react";
import {Link} from "react-router-dom"
import {videos_list} from "../../api/video";
import Video from "../../components/Video";
import {VideoInfo} from '../../types/video'

import "./index.css"
import LiveTvIcon from "@material-ui/icons/LiveTv";

// modify limit of a page
const PAGE_LIMIT = 5;

interface Props {
}

interface States {
    videos: Array<VideoInfo>,
}

class VideoPage extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            videos: [],
        };
        this.handleLazyLoading = this.handleLazyLoading.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await videos_list({limit: PAGE_LIMIT, offset:0});
            const videos: Array<VideoInfo> = response.data.videos;
            this.setState({videos})
        } catch (error) {
            console.error(error)
            this.setState({videos: []})
        }
    }

    async handleLazyLoading(index: number) {
        if ((index + 2) === this.state.videos.length) {
            try {
                const offset = this.state.videos.length
                let response = await videos_list({limit: PAGE_LIMIT, offset: offset});
                let videos:Array<VideoInfo> = response.data.videos;
                videos = this.state.videos.concat(videos)
                this.setState({
                    videos
                });
            } catch (err) {
                console.error(err)
            }
        }
    }

    render(): JSX.Element {
        return (
            <div className="videos-container">
                <Link to="/live">
                    <div className="videos-btn-live">
                        <LiveTvIcon
                            fontSize={"large"}
                            htmlColor={"white"}
                        />
                    </div>
                </Link>
                <div className="videos">
                    <ul>
                        {
                            this.state.videos.map((info: VideoInfo, index: number) => (
                                <li key={info._id}>
                                    <Video
                                        videoInfo={info}
                                        onLazyLoading={this.handleLazyLoading}
                                        index={index}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default VideoPage
