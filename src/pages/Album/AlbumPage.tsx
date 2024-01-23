import { Box, Container } from "@mui/material";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/Search/SearchContext";
import { Album } from "../../types/album";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import { NavigationBar } from "./components/NavigationBar";
import { PhotosTable } from "./components/PhotosTable";
import usePhotos from "../../shared/hooks/usePhotos";
import { useAlbums } from "../../shared/hooks/useAlbums";

export const AlbumPage = () => {
    const {author, provider, ...search} = useContext(SearchContext);

    const [albums, setAlbums] = useState<Album[]>([])
    const [selectMode, setSelectMode] = useState(false);

    const {handleAlbumSelect, selectedAlbum} = useAlbums(albums ?? [])

    const {
            photos,
            page,
            lastPage,
            hasNext,
            changePage,
            loading
    } = usePhotos(author??"", selectedAlbum, provider??"", 60)
    
    useEffect(()=>{
        axios.get(`author/${author}/albums?provider=${provider}`, {
            sendToken : true
        })
            .then((response) => setAlbums(response.data))
            .catch((err) => console.log(err));
    }, [])

    const handleSelect = (select: boolean) => {
        setSelectMode(select);
    }

    return (
        <>
        {
            author!==null&&provider!==null&&(
                <Box>
                    <Container>
                        <AlbumsCarousel albums={albums} onSelect={handleAlbumSelect}/>
                    </Container>
                    {(selectedAlbum !== null) && (
                        <>
                        <PhotosTable album={selectedAlbum} photos={photos} loading={loading} selectMode={selectMode}/>
                        <NavigationBar 
                            page={page} 
                            handlePageChange={changePage} 
                            pageLimit={lastPage}
                            onSelect={handleSelect}
                        />
                        </>
                    )}
                    
                </Box>
            )
        }
        </>

    )
}