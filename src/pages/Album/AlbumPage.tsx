import React from "react";
import { Container, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../context/Search/SearchContext";
import { PhotosTable } from "./components/PhotosTable/PhotosTable";
import usePhotos from "../../shared/hooks/usePhotos";
import { useAlbums } from "../../shared/hooks/useAlbums";
import styled from "styled-components";
import { PhotoView } from "./components/PhotoView/PhotoView";
import { AlbumsCarousel } from "../../shared/components/AlbumsCarousel";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { AlbumTitle } from "./components/AlbumTitle";
import { useLocation } from "react-router-dom";

export const AlbumPage = ({favorites = false} : {favorites?:boolean}) => {
    const {author, provider} = useContext(SearchContext);

    const {
        albums,
        handleAlbumSelect,
        selectedAlbum
    } = useAlbums(favorites)

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
            selectedPhotos
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
        {((author!==null&&provider!==null) || favorites)&&(
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AlbumsCarousel albums={albums} onSelect={handleSelectAlbum} selectedAlbum={selectedAlbum}/>
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