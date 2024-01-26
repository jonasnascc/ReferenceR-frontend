import { Box, Container, Grid } from "@mui/material";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/Search/SearchContext";
import { Album } from "../../types/album";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { PhotosTable } from "./components/PhotosTable/PhotosTable";
import usePhotos from "../../shared/hooks/usePhotos";
import { useAlbums } from "../../shared/hooks/useAlbums";
import { LateralSection } from "./components/LateralSection/LateralSection";
import styled from "styled-components";

export const AlbumPg = () => {
    const {author, provider, ...search} = useContext(SearchContext);

    const [albums, setAlbums] = useState<Album[]>([])
    const [selectMode, setSelectMode] = useState(false);

    const {handleAlbumSelect, selectedAlbum} = useAlbums(albums ?? [])

    const [showPhotoDetails, setShowPhotoDetails] = useState(false);

    const {
            photos,
            page,
            lastPage,
            hasNext,
            changePage,
            loading,
            selectedPhotos,
            handleSelectPhoto,
            clearSelectedPhotos
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

    const handleDetails = () => {
        setShowPhotoDetails(true);
    }

    const handleExitDetails = () => {
        setShowPhotoDetails(false);
        clearSelectedPhotos();
    }

    return (
        <>
        {
            author!==null&&provider!==null&&(
                <Content>
                    <Grid container>
                        <Grid container>
                            
                            <Grid item xs={selectedPhotos.length > 0 && showPhotoDetails ? 6 : 12} > 
                                <Content>
                                    <Container>
                                        <AlbumsCarousel albums={albums} onSelect={handleAlbumSelect}/>
                                    </Container>
                                    {
                                        selectedAlbum !== null && (
                                            <PhotosTable 
                                                album={selectedAlbum} 
                                                photos={photos} 
                                                loading={loading} 
                                                selectMode={selectMode}
                                                onSelectPhoto={handleSelectPhoto}
                                                selectedPhotos={selectedPhotos}
                                                viewMode = {selectedPhotos.length > 0 && showPhotoDetails}
                                            />
                                        )
                                    }
                                </Content>
                            </Grid>
                            {(selectedPhotos.length > 0 && showPhotoDetails && selectedAlbum !== null) && 
                                    <Grid item  xs={6} sx={{position:"relative"}}>
                                            <LateralSection 
                                                show={showPhotoDetails} 
                                                onExit={handleExitDetails}
                                                selectedPhotos={selectedPhotos}
                                            />
                                    </Grid>
                            }
                        </Grid>
                        <NavigationBar 
                            page={page} 
                            handlePageChange={changePage} 
                            pageLimit={lastPage}
                            onSelect={handleSelect}
                            onDetails={handleDetails}
                        />
                    </Grid>
                    
                    
                </Content>
            )
        }
        </>

    )
}
const Content = styled.div`
    position : relative;
    width:100%;
    height: calc(100vh - 160px);
    overflow: auto;
`
const BodyGrid = styled.div`
    height: 100vh;
    width : 100vw;
`