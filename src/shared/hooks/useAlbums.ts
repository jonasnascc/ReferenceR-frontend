import { useContext, useEffect, useState } from "react";
import { Album } from "../../types/album";
import { SearchContext } from "../../context/Search/SearchContext";
import axios from "../../api/axios";

export const useAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectedAlbum, setSelectedAlbum] = useState<Album|null>(null);

    const {
        author, 
        provider,
        changeAlbumId,
        changePage
    } = useContext(SearchContext);

    useEffect(()=>{
        if(author!==null && provider!==null) {
            axios.get(`author/${author}/albums?provider=${provider}`, {
                sendToken : true
            })
                .then((response) => setAlbums( sortAlbums(response.data) ))
                .catch((err) => console.log(err));
        }
    }, [])

    const sortAlbums = (data : Album[]) : Album[] => {
        if(data) {
            const all = data.filter(alb => alb.code == "all");
            const featured = data.filter(alb => alb.name.toLowerCase().trim() == "featured");
            let left : Album[] = data.filter(alb => (alb.name.toLowerCase().trim() !== "featured")&&(alb.code !== "all"))
            left = left.sort((a,b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return 1;
                } else if (nameA > nameB) {
                    return -1;
                } else {
                    return 0;
                }
            });
            return [...all, ...featured, ...left]
        } 
        return data;
    }

    const handleAlbumSelect = (albumId : string) => {
        const selAlbum : Album[] = albums.filter(alb => alb.code === albumId);

        if(selAlbum) {
            setSelectedAlbum(selAlbum[0]);
            if(changeAlbumId)  {
                changeAlbumId(albumId);
                if(changePage) changePage(1)
            }
        }
    }

    return {
        handleAlbumSelect,
        selectedAlbum,
        albums
    }
}