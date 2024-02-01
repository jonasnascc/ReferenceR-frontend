export type Deviation = {
    id: number,
    code: string,
    title: string,
    url: string,
    thumbUrl : string,
    mature: boolean,
    type: string,
    matureLevel: string | null,
    photoPage: string,
    license: string,
    tags : {name:string, url:string} [],
    favorited ?: boolean
}

export type SimplePhoto = {
    id : number,
    code : string,
    title : string,
    url : string
}

export type Tag = {
    name: string,
    url : string
}