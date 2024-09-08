export type Deviation = {
    id: number,
    code: string,
    title: string,
    url: string,
    thumbUrl : string,
    mature: boolean,
    type: string,
    matureLevel: string | null,
    publishedTime : Date,
    page: number,
    license: string,
    tags : {name:string, url:string} [],
    favorited ?: boolean
}

export type SimplePhoto = {
    id : number,
    code : string,
    title : string,
    url : string,
    mature ?: boolean,
    page ?: number,
    albumCode ?: string
}

export type Tag = {
    name: string,
    url : string
}