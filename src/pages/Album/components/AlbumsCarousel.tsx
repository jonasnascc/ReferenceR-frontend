import React, { useState } from "react";
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, Tooltip, Typography } from "@mui/material";
import { Album } from "../../../types/album";

const MOVE_CONSTANT = 300;

type AlbumsCarouselProps = {
    albums : Album[],
    onSelect : (code : string) => void,
    selectedAlbum : Album | null
}

export const AlbumsCarousel = ({albums, onSelect, selectedAlbum} : AlbumsCarouselProps) =>{
    const [position, setPosition] = useState({left: 0});

    const minLeft = ~~((MOVE_CONSTANT * albums.length)  / 4.5);

    const moveLeft = () => {
        if(position.left < 0)
            setPosition({left: position.left + MOVE_CONSTANT})
    }

    const moveRight = () => {
        // if(position.left + minLeft >= 0)
            setPosition({left: position.left - MOVE_CONSTANT})
            // console.log({length: albums.length, minLeft: minLeft, constant: MOVE_CONSTANT, left: position.left - MOVE_CONSTANT, size_times_constant : (albums.length * MOVE_CONSTANT)})

    }

    const formatAlbumLabel = (label : string) : string => {
        if(label.length >= 44)
            return label.substring(0, 43) + "...";
        else return label;
    }

    const isAlbumSelected = (album : Album) => {
        if(selectedAlbum)
            return selectedAlbum.code === album.code;
        return false;
    }

    return (
        <Carousel>
            <ArrowButtonContainer $position={"left"}>
                <ArrowButton><ArrowBackIosIcon/></ArrowButton>
            </ArrowButtonContainer>
            <Items>
                <ItemsList>
                    {
                        albums.map(album => (
                            <Item key={album.url}>
                                <Thumbnail>
                                    <AlbumThumb $selected={isAlbumSelected(album)}>
                                        <ThumbImage src={album.thumbUrl} alt={album.name} onClick={() => onSelect(album.code)}/>
                                        <ThumbLabel>
                                            <LabelText>{formatAlbumLabel(album.name)}</LabelText>
                                        </ThumbLabel>
                                    </AlbumThumb>
                                </Thumbnail>
                            </Item>
                        ))
                    }
                </ItemsList>
            </Items>
            <ArrowButtonContainer $position={"right"}>
                <ArrowButton><ArrowForwardIosIcon/></ArrowButton>
            </ArrowButtonContainer>    
        </Carousel>
    )
}

const Carousel = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const Items = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 0 75px;
`

const ItemsList = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
    height: 100%;
    width: 100%;
`

const Item = styled.div`
    margin: 0;
    padding: 0;
`

const Thumbnail = styled.a`
    position: relative;
    display:flex;
    margin: 0;
    padding: 4px 12px;
    width: 200px;
    height: 200px;
    text-decoration: none;
    align-items : center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    &:hover {
        cursor: pointer;
    }
`

const AlbumThumb = styled.div<{$selected ?: boolean}>`
    position: relative;
    width : 100%;
    height: 100%;
    background-color : white;
    border-radius : 5px;
    border: ${props => props.$selected ? "2px solid black" : "none"}
`

const ThumbImage = styled.img`
    text-decoration : none;
    object-fit: cover;
    width: 100%;
    height: 100%;
`

const ThumbLabel = styled.div`
    position : absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: 0;
    padding: 5px;
    width: 100%;
    background-color: white;

`

const LabelText = styled.span`
    margin: 0;
    padding: 0;
    color: black;
    word-break: break-word;
`

const ArrowButtonContainer = styled.div<{$position: "right" | "left"}>`
    position : absolute;
    display: flex;
    z-index: 2;
    height:100%;
    top: 0px;
    right: ${props => props.$position === "right" ? "0px" : "auto"}
`

const ArrowButton = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    width: 50px;
    background-color : #4f5157;
    color: white;

    z-index:1;

    &:hover {
        background-color: #4f5157;
        cursor: pointer;
    }

    &:active {
        background-color: #4f5157;
    }
`