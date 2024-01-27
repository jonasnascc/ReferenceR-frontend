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
import { LateralSection } from "./components/PhotoView/LateralSection";
import styled from "styled-components";
import { TagsBar } from "./components/PhotoView/TagsBar";

export const AlbumPage = () => {
    const {author, provider, ...search} = useContext(SearchContext);

    const [albums, setAlbums] = useState<Album[]>([])
    const [selectMode, setSelectMode] = useState(false);

    const {handleAlbumSelect, selectedAlbum} = useAlbums(albums ?? [])

    const [showPhotoDetails, setShowPhotoDetails] = useState(false);

    const [viewMode, setViewMode] = useState(false);

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
            currentPhoto
    } = usePhotos(author??"", selectedAlbum, provider??"", 60)
    
    useEffect(()=>{
        axios.get(`author/${author}/albums?provider=${provider}`, {
            sendToken : true
        })
            .then((response) => setAlbums(response.data))
            .catch((err) => console.log(err));
    }, [])

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
        {
            author!==null&&provider!==null&&(
                <Content>
                    <Grid container spacing={"5px"}>
                        <Grid item xs={12} sm={12} md={12} lg={viewMode ? 1 : 2}>
                            <AlbumsBar>
                                <Section $secondary={true}></Section>
                            </AlbumsBar>
                        </Grid>
                        {selectedAlbum!==null&&photos!==null&&<>
                            <Grid item xs={12} sm={viewMode ? 4 : 12} md={viewMode ? 5 : 12} lg={viewMode ? 5 : 10}>
                                <SectionContainer>
                                    <Section>
                                        <Title>{selectedAlbum.name}</Title>
                                        {
                                            loading ? (
                                                loading
                                            ) : (
    <                                           ScrollableArea>
                                                    <PhotosTable 
                                                        album={selectedAlbum}
                                                        photos={photos}
                                                        onSelectPhoto={handleSelectPhoto}
                                                        selectedPhotos={selectedPhotos}
                                                    /> 
                                                </ScrollableArea>
                                            )
                                            
                                        }   
                                    </Section>
                                </SectionContainer>
                            </Grid>
                            {
                                viewMode && (
                                    <Grid item xs={12} sm={8} md={7} lg={6}>
                                        <SectionContainer>
                                            <PhotoView>
                                                <Title  $photoView={true}>{viewMode ? selectedPhotos[0].title : ""}</Title>
                                                    <LateralSection 
                                                        onExit={handleExitDetails} 
                                                        selectedPhotos={selectedPhotos} 
                                                    />
                                            </PhotoView>
                                            <TagsBar tags={currentPhoto ? currentPhoto.tags : []}/>
                                        </SectionContainer>
                                    </Grid>
                                )
                            }
                        </>}
                    </Grid>
                </Content>
            )
        }
        </>

    )
}

const Title = styled.div<{$photoView?:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 100%;
    color: white;
    border-radius: none inherit none inherit;
    font-size: 20px;
    z-index: 101;

    background-color: ${props => props.$photoView ? "#4166C7" : "#EB6767"};
`

const SectionContainer = styled.div`
    position: relative;
    width:100%;
    height: calc(100vh - 140px);
    padding : 10px 2.5px 10px 2.5px;
`

const Section = styled.div<{$secondary ?: boolean}>`
    width:100%;
    height: 100%;
    background-color : ${props => props.$secondary ? "#EB6767" : "white"};
    border-radius: 10px;
    overflow: hidden;
`

const ScrollableArea = styled.div`
    overflow: auto;
    height: 100%;
`

const AlbumsBar = styled(SectionContainer)`
    padding: 15px 10px 15px 10px;

    @media(max-width: 1199px) {
        height: 200px;
    }
`


const PhotoView = styled(Section)`
    
`

const Content = styled.div`
    position : relative;
    overflow: auto;
    height: calc(100vh - 140px);
    margin-right : 7.5px;
    margin-left : 7.5px;
`
const BodyGrid = styled.div`
    height: 100vh;
    width : 100vw;
`