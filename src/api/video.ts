const getVideos = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                id: 1,
                data: {
                    url: "http://www.nicode.top:10080/videos/01.mp4",
                    channel: "testvideogroup",
                    description: "Test video 1 there",
                    song: "Etherwood - Haltija",
                    likes: 10009240,
                    messages: 4527710,
                    shares: 170617,
                    like: false,
                }
            },
            {
                id: 2,
                data: {
                    url: "http://www.nicode.top:10080/videos/02.mp4",
                    channel: "testvideogroup",
                    description: "Test video 2 there",
                    song: "OneRepublic - Counting Stars",
                    likes: 234540,
                    messages: 45277,
                    shares: 5710,
                    like: true,
                }
            }
        ])
    })
}
export default getVideos
