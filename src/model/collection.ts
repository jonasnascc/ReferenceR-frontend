import { SimplePhoto } from "./photo"

export type UserCollection = {
    id:number,
    name : string,
    description:string,
    photos : PhotoCodeByPage[]
}

export type AlbumCollection = {
    albumCode : string | null,
    photos : PhotoCodeByPage[],
    exceptPhotos ?: PhotoCodeByPage[],
    saveAsFavorite : boolean | false
}

export type PhotoCodeByPage = {
    code : string,
    page : number
}