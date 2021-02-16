import React from "react";
import getVideos from "./api/video";
import Video from "./Video";

import "./VideoPage.css"

class VideoPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {videos: []}
    }

    componentWillMount() {
        let response = getVideos();
        response.then(((data: any) => {
            let videos = data.map((video) => ({
                id: video.id,
                data: video.data
            }))
            this.setState({videos: videos})
        }))
    }

    render() {
        return (
            <div className="app_videos">
                <ul>
                    {
                        this.state.videos.map(({id, data}) => (
                            <li key={id}>
                                <Video
                                    _id={id}
                                    url={data.url}
                                    channel={data.channel}
                                    description={data.description}
                                    song={data.song}
                                    likes={data.likes}
                                    messages={data.messages}
                                    shares={data.shares}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

// function VideoPage():JSX.Element {
//     const [videos, setVideos] = useState<any[]>([]);
//
//     useEffect(() => {
//         let response = getVideos();
//
//         response.then(((data: any) => {
//             if(this.mounted)
//             setVideos(data.map((video) => ({
//                 id: video.id,
//                 data: video.data
//             })))
//         }))
//         return ()=>{}
//     }, [videos]);
//
//     return (
//         <div className="app_videos">
//             {
//                 videos.map(({id, data}) => (
//                     <Video
//                         key={id}
//                         url={data.url}
//                         channel={data.channel}
//                         description={data.description}
//                         song={data.song}
//                         likes={data.likes}
//                         messages={data.messages}
//                         shares={data.shares}
//                     />
//                 ))
//             }
//         </div>
//     );
// }

export default VideoPage