import { useContext, useEffect, useState } from "react";
import { Album } from "../../types/album";
import { SearchContext } from "../../context/Search/SearchContext";
import axios from "../../api/axios";
import { useQuery } from "react-query";
import { fetchAuthorAlbums } from "../../api/services/Album";

export const useAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectedAlbum, setSelectedAlbum] = useState<Album|null>(null);

    const {
        author, 
        provider,
        changeAlbumId,
        changePage
    } = useContext(SearchContext);

    useQuery(["author-albums"], () => fetchAuthorAlbums(author??"", provider??""), {
        enabled : author!==null&&provider!==null,
        refetchOnWindowFocus : false,
        onSuccess : (data) => {
            setAlbums(sortAlbums(data));
        }
    });


    const sortAlbums = (data : Album[]) : Album[] => {
        if(data) {
            const all = data.filter(alb => alb.code == "all");
            const featured = data.filter(alb => alb.name.toLowerCase().trim() == "featured");
            let right : Album[] = data.filter(alb => (alb.name.toLowerCase().trim() !== "featured")&&(alb.code !== "all"))
            right = right.sort((a,b) => (a.code < b.code) ? 1: ((a.code > b.code) ? -1 : 0))
            return [...all, ...featured, ...right]
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