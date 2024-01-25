import { Collapse, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Deviation } from "../../../../types/photo";

import CloseIcon from '@mui/icons-material/Close';

export const LateralSection = ({show = false, onExit, selectedPhotos} : {show ?: boolean, onExit : () => any, selectedPhotos : Deviation[]}) => {

    return (
        <SectionContainer>
                    <PhotoTitle>
                        {selectedPhotos[0].title}
                        <ExitButton onClick={() => onExit()}>
                            <CloseIcon sx={{height: "inherit"}}/>
                        </ExitButton>
                    </PhotoTitle>
                    <ImageContainer>
                        <ImageContent src={selectedPhotos[0].url} alt={selectedPhotos[0].title}/>
                    </ImageContainer>
                    
        </SectionContainer>
        
    )
}

const ExitButton = styled.a`
    position : absolute;
    top:8px;
    right:8px;
    color: white;
    cursor: pointer;
    text-decoration: none;
`

const PhotoTitle = styled.div`
    position: relative;
    padding : 10px 20px 10px 20px;
    text-align: center;
    margin-bottom: 20px;
    background-color: #263866;
    color: white;
    font-size: 18px;
`

const ImageContent = styled.img`
    width : 100%;
    height: auto;
    object-fit : scale-down;
`

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    height: 80%;
    padding: 10px;
`

const SectionContainer = styled.div`
    position: relative;
    height: calc(100vh - 160px);
    width : 100%;
    overflow: hidden;
`