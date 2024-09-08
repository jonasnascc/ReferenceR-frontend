import { AlbumCollection } from "../../model/collection"
import axios from "../axios"

const PREFIX = "user/collections"

export const createCollection = async (collection : {name:string, description?:string}) => {
    return await axios.post(PREFIX, collection , {sendToken: true})
        .then(resp => resp.data)
}

export const listUserCollections = async () => {
    return await axios.get(PREFIX, {sendToken: true})
        .then(resp => resp.data)
}

export const addPhotosToCollection = async (collectionId:number, albumCol:AlbumCollection) => {
    return await axios.post(`${PREFIX}/${collectionId}`, albumCol, {sendToken: true})
}