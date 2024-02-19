import React from "react";
import styled from "styled-components";
import { Deviation } from "../../../../types/photo";
import { CircularProgress } from "@mui/material";

type PhotoAreaProps = {
    photo : Deviation | null,
    loading ?: boolean,
    handleImageLoaded ?: () => void,
}

export const PhotoArea = ({photo, loading=false, handleImageLoaded} : PhotoAreaProps) => {

    const handleLoaded = () => {
        if(handleImageLoaded) handleImageLoaded();
    }

    return (
        <Area>
            {
                photo!==null && (
                    <ImageContainer>
                        {loading ? 
                            (<CenterDiv><CircularProgress/></CenterDiv>)
                        : 
                        (
                            <ImageContent src={photo.url} alt={photo.title} onLoad={handleLoaded}/>
                        )}
                    </ImageContainer>
                )
            }
        </Area>
    );
}

const Area = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 10px;
`

const CenterDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
`

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    height: calc(100vh - 150px);
    padding: 10px;
    overflow: hidden;
`

const ImageContent = styled.img`
    width : 100%;
    height: auto;
    object-fit : scale-down;
`