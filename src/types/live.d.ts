export interface LiveInfo {
    _id: string,
    author_id: string,
    author_nick: string,
    author_avatar: string,
    publishUrl: string,
    playUrl: string,
    description: string,
}

export interface LivesListParams {
    limit?: number,
    offset?: number
}