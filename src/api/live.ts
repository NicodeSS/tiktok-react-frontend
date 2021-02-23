import axios from "../utils/axios"

export const getLives = (params = {}) => {
    return axios.get('/live/list', params)
}

export const getCommentsWS = (live_id: string) => {

    let wsUrl = 'ws://182.61.20.79:8080?room=' + live_id //接口
    let ws = new WebSocket(wsUrl); //建立websocket连接

    ws.onopen = function (evt) { //连接websocket触发该函数
        console.log("匿名用户来到直播间" + live_id)
    };

    ws.onclose = function (evt) {
        console.log("匿名用户离开了直播间" + live_id)
    }

    ws.onerror = function (err) {
        console.error('Websocket encountered error: ', err, 'Closing socket');
        ws.close();
    };

    // ws.onmessage = function(evt) { //监听message事件，接收服务端实时传过来的数据
    //     // _this.comments.push(evt.data)
    //     // console.log(comments);
    // };

    // ws.send("我是一条评论"); //发送评论到服务端
    return ws;
}

export const getLivesMocked = () => {
    return new Promise((resolve) => {
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
