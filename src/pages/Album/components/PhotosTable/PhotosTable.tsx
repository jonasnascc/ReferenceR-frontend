import { Box, ImageList, ImageListItem, ImageListItemBar, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Deviation } from "../../../../types/photo";
import { ThumbnailContainer } from "./ThumbnailContainer";
import { Album } from "../../../../types/album";
import styled from "styled-components";

type PhotosTableProps = {
    album : Album | null,
    photos : Deviation[],
    loading ?: boolean,
    selectMode ?: boolean,
    onSelectPhoto ?: (photo : Deviation) => any,
    selectedPhotos ?: Deviation[],
    viewMode ?: boolean,
    currentPhoto : Deviation | null
}

export const PhotosTable = ({album, photos, loading=false, selectMode=false, onSelectPhoto = (photo : Deviation) => {}, selectedPhotos = [], viewMode=false, currentPhoto} : PhotosTableProps) => {

    const handleSelect = (photo : Deviation) => {
        onSelectPhoto(photo);
    }

    const checkIsSelected = (photo : Deviation) : boolean => {
        return selectedPhotos.filter(ph => ph.code===photo.code).length > 0;
    }

    return !album ? null : (
        <TableContainer>
            {loading? (
                <LinearProgress/>
            ) : (
                <>
                <ImageList cols={viewMode ? 3 : 5} rowHeight={250} sx={{width: "100%", height: "100%", overflow:"auto"}} variant="quilted" gap={20} > 
                {photos!==undefined && photos.map((deviation : Deviation) => {
                    return (
                        <ImageListItem key={deviation.code}>
                            <ThumbnailContainer 
                                selected={ currentPhoto==null? checkIsSelected(deviation) : (deviation.code === currentPhoto.code) }
                                photo={deviation}
                                url={deviation.thumbUrl ? deviation.thumbUrl : deviation.url} 
                                title={deviation.title} 
                                onSelect={() => {
                                    handleSelect(deviation)
                                }}
                            />
                        </ImageListItem>
                    )
                })}
                </ImageList>
                </>
            )}
        </TableContainer>
    ) 
}

const TableContainer = styled.div`
    position: relative;
    height: calc(100vh - 170px);
    margin-left: 10px;
    margin-right : 10px;
`
