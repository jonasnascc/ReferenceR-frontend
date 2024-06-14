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
    photoPage: string,
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
}

export type Tag = {
    name: string,
    url : string
}