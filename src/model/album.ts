import { SimplePhoto } from "./photo";

export type Album = {
    id : number,
    code : string,
    name : string,
    size : number,
    thumbnail : SimplePhoto | null,
    photos ?: SimplePhoto[],
    url : string,
    author : string,
    provider : string,
}

export type UserCollection = {
    description:string,
} & Omit<Album, 'code' | 'url' | 'author' | 'provider'>

export type CollectionPhotosSelection = {
    album : Album,
    photos : SimplePhoto[],
    exceptPhotos : SimplePhoto[],
    saveAsFavorite : boolean | false
}