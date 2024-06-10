import axios from "../axios"
import {Album} from "../../model/album"

export const fetchAuthorAlbums = async (author : string, provider: string) => {
    return axios.get(`author/${author}/albums`, {
        sendToken : true,
        provider : provider
    }).then((response) => response.data);
}

export const favoriteAlbum = async (album : Album) => {
    return await axios.post(`albums/favorite`, album, {
        sendToken : true
    }).then((resp) => resp.data)
}

export const unfavoriteAlbum = async (album : Album) => {
    return await axios.delete(`author/${album.author}/albums/${album.code}`, {
        provider: album.provider,
        sendToken : true
    }).then((resp) => resp.data)
}

export const fetchFavoritedAlbums = async () => {
    return await axios.get("albums/favorites", {
        sendToken:true
    })
    .then((response) => response.data)
}

export const fetchAlbumThumbnail = async (albumId : number) => {
    return await axios.get(`albums/${albumId}/thumbnail`, {
        sendToken:true
    })
    .then((response) => response.data)
}
