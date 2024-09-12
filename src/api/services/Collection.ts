import { Album } from "../../model/album"
import { AlbumCollection, CollectionPhotos } from "../../model/collection"
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


export const addPhotosToCollection = async (collectionId:number, photos:CollectionPhotos) => {
    return await axios.post(`${PREFIX}/${collectionId}/photos`, photos, {sendToken: true}).then(resp => resp.data)
}

export const listCollectionPhotos = async (collectionId:number) => {
    return await axios.get(`${PREFIX}/${collectionId}/photos`, {sendToken: true})
        .then(resp => resp.data)
}

export const listCollectionAlbums = async (collectionId:number) => {
    return await axios.get(`${PREFIX}/${collectionId}/albums`, {sendToken: true})
        .then(resp => resp.data.sort((a:Album, b:Album) => b.id - a.id))
}

export const listCollectionAlbumPhotos = async (collectionId:number, albumId:number) => {
    return await axios.get(`${PREFIX}/${collectionId}/albums/${albumId}/photos`, {sendToken: true})
        .then(resp => resp.data)
}
