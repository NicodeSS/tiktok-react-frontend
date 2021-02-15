import React, {useEffect, useState} from 'react';
import Video from "./Video";
import getVideos from "./api/video"

import "./App.css"


function App() {
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        let response = getVideos();

        response.then(((data: any) => {
            setVideos(data.map((video) => ({
                id: video.id,
                data: video.data
            })))
        }))

    }, [videos]);

    return (
        <div className="app">
            <div className="app_videos">
                {
                    videos.map(({id, data}) => (
                        <Video
                            key={id}
                            vid={id}
                            url={data.url}
                            channel={data.channel}
                            description={data.description}
                            song={data.song}
                            likes={data.likes}
                            messages={data.messages}
                            shares={data.shares}

                            like={data.like}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default App;
