import axios from "../utils/axios"
import {VideosListParams} from "../types/video";

export const videos_list = (params: VideosListParams = {}) => {
    return axios.get('/video/list', params)
}

export const video_like = (id: string) => {
    return axios.post('/video/like', {_id: id})
}

export const getVideosMocked = () => {
    return new Promise((resolve) => {
        resolve(
            [
                {
                    "_id": "602bd245b32b6358cd0591fa",
                    "videoUrl": "http://182.61.20.79:3000/res/video01.mp4",
                    "imgUrl": "http://182.61.20.79:3000/res/video01.jpg",
                    "author_nick": "无名小子",
                    "author_avatar": "http://182.61.20.79:3000/res/avatar/icon.jpg",
                    "author_id": "602bc541e2ff9049179b504e",
                    "description": "我是视频1描述",
                    "tagList": [
                        "这是一个tag1",
                        "这是另一个tag1"
                    ],
                    "song": "光宗信吉 - Playmaker(Re-arranged)",
                    "createdAt": "2020-02-02 17:38:41",
                    "updatedAt": "2020-02-02 20:00:30",
                    "like": 0,
                    "comment": 0,
                    "share": 0,
                },
                {
                    "_id": "602bd245b32b6358cd0591fe",
                    "videoUrl": "http://182.61.20.79:3000/res/video01.mp4",
                    "imgUrl": "http://182.61.20.79:3000/res/video01.jpg",
                    "author_nick": "无名小子",
                    "author_avatar": "http://182.61.20.79:3000/res/avatar/icon.jpg",
                    "author_id": "602bc541e2ff9049179b504e",
                    "description": "我是视频1描述",
                    "tagList": [
                        "这是一个tag1",
                        "这是另一个tag1"
                    ],
                    "song": "光宗信吉 - Playmaker(Re-arranged)",
                    "createdAt": 1613484613261,
                    "updatedAt": 1613484613261,
                    "like": 0,
                    "comment": 0,
                    "share": 0,
                }
            ]
        )
    })
}
