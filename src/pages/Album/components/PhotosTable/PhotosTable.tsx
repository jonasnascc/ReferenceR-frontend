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
        return selectedPhotos.filter(ph => ph.id===photo.id).length > 0;
    }

    return !album ? null : (
        <TableContainer>
            {loading? (
                <LinearProgress/>
            ) : (
                <>
                <AlbumTitle>
                    <Box textAlign={"center"}>
                        <p>{album.name}</p>
                        {selectedPhotos.length > 0 && <>
                            <SelectedText>
                                <SelectedNumber>{`${selectedPhotos.length}`}</SelectedNumber>{` selected.`}
                            </SelectedText> 
                        </>}
                    </Box>
                </AlbumTitle>
                <ImageList cols={viewMode ? 3 : 5} rowHeight={250} sx={{width: "100%", height: "100%", overflow:"auto"}} variant="quilted" gap={20} > 
                {photos!==undefined && photos.map((deviation : Deviation) => {
                    return (
                        <ImageListItem key={deviation.id}>
                            <ThumbnailContainer 
                                selected={ currentPhoto==null? checkIsSelected(deviation) : (deviation.id === currentPhoto.id) }
                                url={deviation.thumbUrl ? deviation.thumbUrl : deviation.url} 
                                title={deviation.title} 
                                selectMode={selectMode} 
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


const AlbumTitle = styled.div`
    margin: 20px 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`

const SelectedNumber = styled.span`
    margin:0;
    padding: 0;
    color: green;
`

const SelectedText = styled.span`
    font-size: 15px;
`