import { Deviation } from "./photo"

export type CollectionPhotosPage = {
    page : number,
    hasMore : boolean,
    photos : Deviation[]
}