import { Album } from "./album"

export type UserCollection = {
    id:number,
    name : string,
    description:string,
    photos : CollectionPhoto[]
}

export type AlbumCollection = {
    album : Album,
    photos : CollectionPhoto[],
    exceptPhotos : CollectionPhoto[],
    saveAsFavorite : boolean | false
}

export type CollectionPhotos = {
    albums : AlbumCollection[]
}

export type CollectionPhoto = {
    code : string,
    page : number
}