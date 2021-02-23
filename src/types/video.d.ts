export interface VideoInfo {
    _id: string,
    videoUrl: string,
    imgUrl: string,
    author_nick: string,
    author_avatar: string,
    author_id: string,
    description: string,
    tagList: Array<string>
    song: string,
    createdAt: string,
    updatedAt: string,
    like: number,
    comment: number,
    share: number
}

export interface VideosListParams {
    limit?: number,
    offset?: number
}