const putLike = (id: number, like: boolean) => {
    return new Promise((resolve) => {
        console.log("fromApi:" + id + " " + like)
        let data = {"details": "点赞成功"};
        resolve(data)
    })
}
export default putLike