const getLives = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                id: 1,
                data:{
                    "author": "大明",
                    "url": "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8",
                    "description": "测试CCTV1活动",
                    "createdAt": "2021-01-26T19:30:22.420Z",
                    "updatedAt": "2021-01-30T10:24:26.590Z",
                    "like": 0,
                    "comment": 0,
                    "share": 0
                }
            },
            {
                id: 2,
                data:{
                    "author": "大明",
                    "url": "http://ivi.bupt.edu.cn/hls/cctv2hd.m3u8",
                    "description": "测试CCTV2活动",
                    "createdAt": "2021-01-26T19:30:22.420Z",
                    "updatedAt": "2021-01-30T10:24:26.590Z",
                    "like": 0,
                    "comment": 0,
                    "share": 0
                }
            }
        ])
    })
}
export default getLives
