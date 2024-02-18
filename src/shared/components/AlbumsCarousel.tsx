import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Album } from "../../types/album";
import { useQuery, useQueryClient } from "react-query";
import { fetchAlbumThumbnail } from "../../api/services/Album";
import { Skeleton } from "@mui/material";

const MOVE_CONSTANT = 200;

type AlbumsCarouselProps = {
    albums : Album[],
    onSelect : (code : string) => void,
    selectedAlbum : Album | null,
    fullView ?: boolean
}

export const AlbumsCarousel = ({albums, onSelect, selectedAlbum, fullView=false} : AlbumsCarouselProps) =>{
    const listRef = useRef<HTMLUListElement>(null);

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

    const moveLeft = () => {
        const ref : any = listRef.current;
        if(ref) {
            ref.scrollTo({
                left: ref.scrollLeft - MOVE_CONSTANT,
                behavior: 'smooth'
            });
        }
    }
    const moveRight = () => {
        const ref : any = listRef.current;
        if(ref) {
            ref.scrollTo({
                left: ref.scrollLeft + MOVE_CONSTANT,
                behavior: 'smooth'
            });
        }
    }

    return (
        <Carousel $fullView={fullView}>
            
            <ArrowButtonContainer $position={"left"} onClick={moveLeft}>
                
                <ArrowButton><ArrowBackIosIcon/></ArrowButton>
            </ArrowButtonContainer>
            
                <ItemsList ref={listRef} $fullView={fullView}>
                    {
                        albums.map(album => (
                            <Item key={album.url}>
                                <Thumbnail>
                                    <AlbumThumb $selected={isAlbumSelected(album)}>
                                        <CarouselImage album={album} onSelect={onSelect}/>
                                        <ThumbLabel>
                                            <LabelText>{formatAlbumLabel(album.name)}</LabelText>
                                        </ThumbLabel>
                                    </AlbumThumb>
                                </Thumbnail>
                            </Item>
                        ))
                    }
                </ItemsList>
            
            <ArrowButtonContainer $position={"right"} onClick={moveRight}>
                <ArrowButton><ArrowForwardIosIcon/></ArrowButton>
            </ArrowButtonContainer>    
        </Carousel>
    )
}

const CarouselImage = ({album, onSelect} : {album: Album, onSelect: (code:string) => void}) => {
    const queryClient = useQueryClient();

    const [url, setUrl] = useState(album.thumbnail?.url??"");
    const [error, setError] = useState(false);

    const {isLoading} = useQuery(`album-${album.id}-thumbnail-url`, () => fetchAlbumThumbnail(album.id), {
        enabled: url === "",
        refetchOnWindowFocus:false,
        onSuccess: (resp) => setUrl(resp)
    });

    const handleError = () => {
        setError(false);
    }

    return(
        <>
            {
                (isLoading || error) ? 
                (
                    <Skeleton variant="rectangular" width="100%" height="100%" onClick={() => onSelect(album.code)}/>
                ) 
                : 
                (
                    <ThumbImage src={url} alt={album.name} onClick={() => onSelect(album.code)} onError={handleError}/>
                )
            }
        </>
        
    )
}

const Carousel = styled.div<{$fullView ?: boolean}>`
    position: relative;
    width: 100%;
    height: ${props => props.$fullView ? "100%" : "200px"};
    margin: 20px 0;
    

`

const ItemsList = styled.ul<{$fullView ?: boolean}>`
    display: flex;
    margin: 0;
    padding: 0 50px;
    position: relative;
    height: 100%;
    width: 100%;

    ${props => props.$fullView ? "flex-wrap : wrap;" : ""}

    overflow-x : hidden;
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
    background-color : #F9F9F9;
    color: #4f5157;

    z-index:1;

    &:hover {
        background-color: #F9F9F9;
        cursor: pointer;
    }

    &:active {
        background-color: #F9F9F9;
    }
`