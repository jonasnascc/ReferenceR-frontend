import { Album } from "./album"
import { Deviation, SimplePhoto } from "./photo"

export type UserCollection = {
    id:number,
    name : string,
    description:string,
    photos : SimplePhoto[]
}

export type AlbumCollection = {
    album : Album,
    photos : SimplePhoto[],
    exceptPhotos : SimplePhoto[],
    saveAsFavorite : boolean | false
}

export type CollectionPhotos = {
    albums : AlbumCollection[]
}