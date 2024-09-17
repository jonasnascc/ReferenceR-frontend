import { Album } from "./album"
import { Deviation, SimplePhoto } from "./photo"

export type UserCollection = {
    id:number,
    name : string,
    description:string,
    siez: number,
    photos : SimplePhoto[]
}

export type CollectionPhotosSelection = {
    album : Album,
    photos : SimplePhoto[],
    exceptPhotos : SimplePhoto[],
    saveAsFavorite : boolean | false
}