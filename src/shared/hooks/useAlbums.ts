import { useContext, useEffect, useState } from "react";
import { Album } from "../../types/album";
import { SearchContext } from "../../context/Search/SearchContext";
import { useQuery } from "react-query";
import { fetchAuthorAlbums, fetchFavoritedAlbums } from "../../api/services/Album";

export const useAlbums = (favoritedAlbums ?: boolean) => {
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectedAlbum, setSelectedAlbum] = useState<Album|null>(null);

    const {
        author, 
        provider,
        changeAlbumId,
        changePage
    } = useContext(SearchContext);

    const fetchFunction = favoritedAlbums ? () => fetchFavoritedAlbums() : () => fetchAuthorAlbums(author??"", provider??"");

    useQuery(["author-albums"], fetchFunction, {
        enabled :(author!==null&&provider!==null) || favoritedAlbums,
        refetchOnWindowFocus : false,
        onSuccess : (data) => {
            setAlbums(sortAlbums(data));
        }
    });


    const handleAlbumSelect = (album : Album) => {
        let selAlbum : Album[];
        if(favoritedAlbums) selAlbum = albums.filter(alb => alb.id === album.id);
        else selAlbum = albums.filter(alb => alb.code === album.code);

        if(selAlbum) {
            setSelectedAlbum(selAlbum[0]);
            if(changeAlbumId)  {
                changeAlbumId(album.code);
                if(changePage) changePage(1)
            }
        }
    }

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


    return {
        handleAlbumSelect,
        selectedAlbum,
        albums
    }
}