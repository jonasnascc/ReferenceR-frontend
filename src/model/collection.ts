import { SimplePhoto } from "./photo"

export type UserCollection = {
    id:string,
    name : string,
    description:string,
    photos : SimplePhoto[]
}