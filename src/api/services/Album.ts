import axios from "../axios"

export const fetchAuthorAlbums = async (author : string, provider: string) => {
    return axios.get(`author/${author}/albums`, {
        sendToken : true,
        provider : provider
    }).then((response) => response.data);
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
