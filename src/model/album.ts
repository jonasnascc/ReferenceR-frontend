import { SimplePhoto } from "./photo";

export type Album = {
    id : number,
    code : string,
    name : string,
    url : string,
    thumbnail : SimplePhoto,
    author : string,
    provider : string,
    size : number,
    favorited ?: boolean;
}