import { useContext, useState } from "react";
import { Album } from "../../types/album";
import { SearchContext } from "../../context/Search/SearchContext";

export const useAlbums = (albums : Album[]) => {
    const [selectedAlbum, setSelectedAlbum] = useState<Album|null>(null);
    const search = useContext(SearchContext);

    const handleAlbumSelect = (albumId : string) => {
        const selAlbum : Album[] = albums.filter(alb => alb.code === albumId);

        if(selAlbum) {
            setSelectedAlbum(selAlbum[0]);
            if(search.changeAlbumId)  {
                search.changeAlbumId(albumId);
                if(search.changePage) search.changePage(1)
            }
        }
    }

    return {
        handleAlbumSelect,
        selectedAlbum
    }
}