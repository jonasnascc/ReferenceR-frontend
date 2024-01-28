import { Box, Collapse, Container, Grid, Typography } from "@mui/material";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/Search/SearchContext";
import { Album } from "../../types/album";
import { PhotosTable } from "./components/PhotosTable/PhotosTable";
import usePhotos from "../../shared/hooks/usePhotos";
import { useAlbums } from "../../shared/hooks/useAlbums";
import styled from "styled-components";
import { TagsBar } from "./components/PhotoView/TagsBar";
import { PhotoView } from "./components/PhotoView/PhotoView";
import { AlbumsCarousel } from "./components/AlbumsCarousel";

export const AlbumPage = () => {
    const {author, provider, ...search} = useContext(SearchContext);

    const [selectMode, setSelectMode] = useState(false);

    const [showPhotoDetails, setShowPhotoDetails] = useState(false);

    const [viewMode, setViewMode] = useState(false);

    const {
        albums,
        handleAlbumSelect,
        selectedAlbum
    } = useAlbums()

    const {
            photos,
            page,
            lastPage,
            hasNext,
            changePage,
            loading,
            selectedPhotos,
            handleSelectPhoto,
            clearSelectedPhotos,
            currentPhoto,
            loadingTags
    } = usePhotos(author??"", selectedAlbum, provider??"", 60)
    
    useEffect(() => {
        if(albums.length > 0) {
            handleAlbumSelect(albums[0].code);
        }
    }, [albums])

    useEffect(() => {
        setViewMode(selectedPhotos.length > 0);
    }, [selectedPhotos])

    const handleSelect = (select: boolean) => {
        setSelectMode(select);
    }

    const handleDetails = () => {
        setShowPhotoDetails(true);
    }

    const handleExitDetails = () => {
        setShowPhotoDetails(false);
        clearSelectedPhotos();
    }

    return (
        <>
        <Menu/>
        {author!==null&&provider!==null&&(
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel>
                            <AlbumsCarousel albums={albums} onSelect={handleAlbumSelect} selectedAlbum={selectedAlbum}/>
                        </Carousel>
                    </Grid>
                    <Grid item xs={viewMode ? 6 : 12}>
                        <PhotosTable 
                            album={selectedAlbum} 
                            photos={photos} 
                            loading={loading} 
                            viewMode={viewMode}
                            onSelectPhoto={handleSelectPhoto}
                        />
                    </Grid>
                    <PhotoView 
                        show={currentPhoto!==null} 
                        currentPhoto={currentPhoto}
                        selectedPhotos={selectedPhotos} 
                        onExit={handleExitDetails}
                        loadingTags={loadingTags}
                    />
                </Grid>
                
            </Container>
        )}
        </>

    )
}

const Content = styled.div`
    height: calc(100vh - 140px);
    width: 100%;
`

const Menu = styled.div`
    width: 100%;
    height: 70px;
    border: solid 1px black;
`

const Carousel = styled.div`
    margin: 20px 0;
    width: 100%;
    height: 200px;
`

const AlbumTitle = styled.div`
    margin: 20px 0;
    width: 100%;
    height: 70px;
    border: solid 1px black;
`

const Photos = styled.div`
    width: 100%;
    height: 100%;
`