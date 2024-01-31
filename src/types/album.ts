export type Album = {
    id : number,
    code : string,
    name : string,
    url : string,
    thumbUrl : string,
    author : string,
    provider : string,
    size : number,
    favorited ?: boolean;
}