import React, { useState } from "react";
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Tooltip, Typography } from "@mui/material";

const MOVE_CONSTANT = 250;

type AlbumsCarouselProps = {
    albums : any[];
    onSelect : (code : string) => void;
}

export const AlbumsCarousel = ({albums, onSelect} : AlbumsCarouselProps) =>{
    const [position, setPosition] = useState({left: 0})

    const moveLeft = () => {
        if(position.left < 0)
            setPosition({left: position.left + MOVE_CONSTANT})
    }

    const moveRight = () => {
         setPosition({left: position.left - MOVE_CONSTANT})
    }

    const handleSelectAlbum = () => {

    }

    return (
        <AlbumsBlock>
            <ArrowButtonContainer style={{left: "0px"}}>
                <ArrowButton onClick={moveLeft}>
                    <ArrowBackIosIcon style={{color:"white", marginLeft:"10px"}}/>
                </ArrowButton>
            </ArrowButtonContainer>
            

            <ArrowButtonContainer style={{right: "0px"}}>
                <ArrowButton onClick={moveRight}>
                    <ArrowForwardIosIcon style={{color:"white"}}/>
                </ArrowButton>
            </ArrowButtonContainer>

            <CarouselList>
                
                {albums.map(album => {
                    return (
                        <li key={album.code} style={{...position, position:"relative"}}>
                            <Tooltip title={album.name} arrow>
                                <AlbumThumb onClick={() => onSelect(album.code)}>
                                    {
                                        album.thumbUrl !== "" ? (
                                            <ThumbImage src={album.thumbUrl} alt={album.name}/>
                                        ) : (
                                            <>
                                                <VisibilityOffIcon/>
                                                <Typography fontSize={12} color={"black"}>{album.name}</Typography>
                                            </>
                                        ) 
                                    }
                                    
                                </AlbumThumb>
                            </Tooltip>
                        </li>
                    )
                })}
            </CarouselList>
        </AlbumsBlock>
    );
}
const VisibilityOffIcon = styled(VisibilityOffOutlinedIcon)`
    color: black;
`
const CarouselList = styled.ul`
    display : flex;
    align-items: center;
    list-style : none;
    overflow: hidden;   
    background-color : #E4E4E4;
    padding : 0px;
    margin : 0;
    width: 99%;
    height: 100%;
`
const ThumbImage = styled.img`
    text-decoration : none;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
`
const AlbumThumb = styled.a`
    display:flex;
    overflow: hidden;
    position: relative;
    min-width: 205px;
    min-height: 205px;
    max-width: 205px;
    max-height: 205px;
    background-color : white;
    border : 1px solid #2638;
    margin-left : 30px;
    transition: transform 0.1s, box-shadow 0.1s;
    text-decoration: none;
    align-items : center;
    justify-content: center;
    box-shadow: 0 0 10px 3px rgba(0, 1, 1, 0.1);
    
    &:hover {
        z-index: 1;
        box-shadow: none;
        transform: scale(1.2);
        cursor : pointer;
    }
`
const AlbumsBlock = styled.div`
    position:relative;
    display:flex;
    height: 275px;
    padding: 10px 0px 10px 0px;
    align-items: center;
    max-width: 100%;
    margin-top: 20px;
`

const ArrowButtonContainer = styled.div`
    position : absolute;
    display: flex;
    align-items : center;
    justify-content : center;
    z-index: 2;
    height:100%;
`

const ArrowButton = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    width: 30px;
    height: 130px;
    background-color : #263866;
    border-radius: 15px;

    z-index:1;

    &:hover {
        background-color: #22325C;
        cursor: pointer;
    }

    &:active {
        background-color: #22325C;
    }
`