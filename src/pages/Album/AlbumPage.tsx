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
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { AlbumTitle } from "./components/AlbumTitle";

export const AlbumPage = () => {
    const {author, provider} = useContext(SearchContext);

    const {
        albums,
        handleAlbumSelect,
        selectedAlbum
    } = useAlbums()

    const {
            photos,
            page,
            lastPage,
            changePage,
            loading,
            handleSelectPhoto,
            clearSelectedPhotos,
            currentPhoto,
            currentTags,
            loadingTags,
            viewMode,
            handleSelectMode,
            selectMode,
            selectedPhotos,
            handleViewLastSelected
    } = usePhotos(author??"", selectedAlbum, provider??"", 60)
    
    useEffect(() => {
        if(albums.length > 0) {
            handleAlbumSelect(albums[0].code);
        }
    }, [albums])

    const handleSelectAlbum = (albumCode : string) => {
        handleExitView();
        handleAlbumSelect(albumCode);
    }

    const handleExitView = () => {
        clearSelectedPhotos();
    }

    return (
        <>
        {author!==null&&provider!==null&&(
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel>
                            <AlbumsCarousel albums={albums} onSelect={handleSelectAlbum} selectedAlbum={selectedAlbum}/>
                        </Carousel>
                    </Grid>
                    <Grid item xs={viewMode ? 6 : 12}>
                        <AlbumTitle 
                            album={selectedAlbum} 
                            selectedSize={selectedPhotos.length}
                        />
                        <PhotosTable 
                            album={selectedAlbum} 
                            photos={photos} 
                            currentPhoto={currentPhoto}
                            loading={loading} 
                            viewMode={viewMode}
                            onSelectPhoto={handleSelectPhoto}
                            selectedPhotos={selectedPhotos}
                        />
                        <NavigationBar 
                            handlePageChange={changePage} 
                            onSelect={handleSelectMode} 
                            onViewPhoto={() => null}
                            page={page}
                            pageLimit={lastPage}
                            viewAllowed={selectMode}
                        />
                    </Grid>
                    <PhotoView 
                        show={currentPhoto!==null} 
                        currentPhoto={currentPhoto}
                        onExit={handleExitView}
                        tags = {currentTags}
                        loadingTags={loadingTags}
                    />
                </Grid>
            </Container>
        )}
        </>

    )
}

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

const Photos = styled.div`
    width: 100%;
    height: 100%;
`