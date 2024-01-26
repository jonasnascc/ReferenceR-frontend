import { ImageList, ImageListItem, ImageListItemBar, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Deviation } from "../../../../types/photo";
import { ThumbnailContainer } from "./ThumbnailContainer";
import { Album } from "../../../../types/album";
import styled from "styled-components";

type PhotosTableProps = {
    album : Album,
    photos : Deviation[],
    loading ?: boolean,
    selectMode ?: boolean,
    onSelectPhoto ?: (photo : Deviation) => any,
    selectedPhotos ?: Deviation[],
    viewMode ?: boolean
}

export const PhotosTable = ({album, photos, loading=false, selectMode=false, onSelectPhoto = (photo : Deviation) => {}, selectedPhotos = [], viewMode=false} : PhotosTableProps) => {

    const handleSelect = (photo : Deviation) => {
        onSelectPhoto(photo);
    }

    const isPhotoSelected = (photoId : number) : boolean => {
        if(selectedPhotos.length === 0) return false;
        if(selectedPhotos.filter(ph => ph.id === photoId).length > 0){
            return true;
        } else return false;
    }

    return(
        <TableContainer>
            {loading? (
                <LinearProgress/>
            ) : (
                <ImageList cols={4} rowHeight={200} sx={{width: "100%", height: "100%", marginBottom: "100px", overflow:"hidden"}} variant="quilted" gap={15} > 
                {photos!==undefined && photos.map((deviation : Deviation) => {
                    return (
                        <ImageListItem key={deviation.id}>
                            <ThumbnailContainer 
                                selected={isPhotoSelected(deviation.id)}
                                url={deviation.url} 
                                title={deviation.title} 
                                selectMode={selectMode} 
                                onSelect={() => {
                                    handleSelect(deviation)
                                }}
                            />
                            <ImageListItemBar
                                title={deviation.title}
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
    margin-left: 10px;
    margin-right : 10px;
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