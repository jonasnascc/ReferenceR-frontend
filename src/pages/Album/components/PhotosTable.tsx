import { CircularProgress, Container, ImageList, ImageListItem, LinearProgress, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Deviation } from "../../../types/photo";
import { ThumbnailContainer } from "./ThumbnailContainer";
import { SearchContext } from "../../../context/Search/SearchContext";
import { Album } from "../../../types/album";
import styled from "styled-components";

type PhotosTableProps = {
    album : Album,
    photos : Deviation[],
    loading ?: boolean,
    selectMode ?: boolean
}

export const PhotosTable = ({album, photos, loading=false, selectMode=false} : PhotosTableProps) => {
    const [selectedPhotos, setSelectedPhotos] = useState<Deviation[]>([])

    const handleSelect = (photoId : number) => {
        const findedPhotos : Deviation[] = selectedPhotos.filter(ph => ph.id === photoId);
        if(findedPhotos.length > 0){
            findedPhotos.forEach(ph => {
                setSelectedPhotos(selectedPhotos.filter(ph=>ph.id!==photoId))
            })
        } else {
            photos.filter(photo => photo.id === photoId).forEach(ph => {
                setSelectedPhotos([...selectedPhotos, ph])
            })
        }
    }

    return(
        <TableContainer>
            <AlbumNameHeader>{album.name}</AlbumNameHeader>
            {loading? (
                <LinearProgress/>
            ) : (
                <ImageList cols={4} sx={{ width: "100%", height: "100%", overflow:"hidden" }} variant="masonry" gap={15} > 
                {photos!==undefined && photos.map((deviation : Deviation) => {
                    return (
                        <ImageListItem key={deviation.id}>
                            <ThumbnailContainer 
                                url={deviation.url} 
                                title={deviation.title} 
                                selectMode={selectMode} 
                                onSelect={() => {
                                    handleSelect(deviation.id);
                                    console.log(selectedPhotos)
                                }}
                            />
                        </ImageListItem>
                    )
                })}
                </ImageList>
            )}
        </TableContainer>

    )
}

const TableContainer = styled.div`
    margin-left: 10%;
    margin-right : 10%;
`


const AlbumNameHeader = styled.p`
    width: 100%;
    text-align: center;
    background-color: #263866;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    color: white;
`