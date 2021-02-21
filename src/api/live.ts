import axios from "../utils/axios"

const getLives = (params={}) => {
    return axios.get('/video/list',params)
}

const getLivesMocked = () => {
    return new Promise((resolve, reject) => {
        resolve(
            [
                {
                    "_id": "602bdd7cb32b6358cd0591fe",
                    "author_id": "602bc541e2ff9049179b504e",
                    "author_nick": "无名小子",
                    "author_avatar": "http://182.61.20.79:3000/res/avatar/icon.jpg",
                    "publishUrl": "rtmp://182.61.20.79:1935/live/602bc541e2ff9049179b504e",
                    "playUrl": "http://182.61.20.79:1936/live/602d053e7032bb66359ba19e/index.m3u8",
                    "description": "无名小子的直播间1"
                },
                {
                    "_id": "602bde75b32b6358cd0591ff",
                    "author_id": "602bc541e2ff9049179b504e",
                    "author_nick": "无名小子",
                    "author_avatar": "http://182.61.20.79:3000/res/avatar/icon.jpg",
                    "publishUrl": "rtmp://182.61.20.79:1935/live/602bc551e2ff9049179b504f",
                    "playUrl": "http://182.61.20.79:1936/live/602d053e7032bb66359ba19e/index.m3u8",
                    "description": "无名小子的直播间2"
                }
            ]
        )
    })
}

export default getLives
