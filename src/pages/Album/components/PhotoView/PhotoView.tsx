import styled from "styled-components";
import { Deviation, Tag } from "../../../../types/photo";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from "@mui/material";
import { TagsBar } from "./TagsBar";


type PhotoViewProps = {
    show ?: boolean,
    onExit : () => any,
    currentPhoto : Deviation | null,
    selectedPhotos ?: Deviation[],
    loadingTags ?: boolean,
    tags : Tag[]
}

export const PhotoView = ({show = false, onExit, selectedPhotos = [], loadingTags = true, currentPhoto, tags} : PhotoViewProps) => {
    return (
        <>
        {show && currentPhoto!==null &&
            <Grid item xs={6}>
                <SectionContainer>
                    <ExitButton onClick={() => onExit()}>
                        <ArrowBackIcon sx={{height: "inherit"}}/>
                    </ExitButton>
                    
                    <PhotoTitle>{currentPhoto.title}</PhotoTitle>

                    <ImageContainer>
                        <ImageContent src={currentPhoto.url} alt={currentPhoto.title}/>
                    </ImageContainer>

                    <TagsBar tags={tags} loading={loadingTags}/>
                </SectionContainer>
            </Grid>
        }
        </>
        
    )
}


const SectionContainer = styled.div`
    position: relative;
    margin-top: 20px;
    height: calc(100vh - 90px);
    width : 100%;
    overflow: hidden;
    border: solid 3px #4f5157;
    border-radius:5px;
`

const PhotoTitle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    text-align: center;
    margin-bottom: 20px;
    background-color: #4f5157;
    color: white;
    font-size: 18px;
`

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    height: calc(80vh - 160px);
    padding: 10px;
`

const ImageContent = styled.img`
    width : 100%;
    height: auto;
    object-fit : scale-down;
`

const ExitButton = styled.a`
    position : absolute;
    top:20px;
    left:8px;
    color: white;
    cursor: pointer;
    text-decoration: none;
    z-index: 100;
`