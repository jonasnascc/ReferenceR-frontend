import { Album } from "../../model/album";
import { Deviation } from "../../model/photo";
import axios from "../axios";

export const fetchAlbumPhotos = async (album: Album | null, author: string | null, provider: string, page:number, photosPerPage: number) => {
    if(album && author){
        return await axios.get(`author/${author}/albums/${album.code}/photos?page=${page}&limit=${photosPerPage}&maxThumbSize=500`, {
            sendToken : true, provider : provider}
        ).then((response) => response.data
        .sort((a:Deviation, b:Deviation) => {
            const dateA = new Date(a.publishedTime);
            const dateB = new Date(b.publishedTime);
            return dateB.getTime() - dateA.getTime();
        }))
    }
}


export const fetchPhotoTags = async (photo : Deviation | null, provider : string) => {
    return await axios.get(`deviations/tags?url=${photo?.photoPage}`, { 
        sendToken: true, provider:provider 
    }).then((resp) => resp.data);
}