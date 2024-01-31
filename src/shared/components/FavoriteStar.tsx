import React, { useEffect, useState } from "react";
import { Deviation } from "../../types/photo";
import { Box, SxProps, Theme } from "@mui/material";

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import styled from "styled-components";
import { Album } from "../../types/album";
import axios from "../../api/axios";


type FavoriteStarProps = {
    sx?:SxProps<Theme>,
    blocked ?: boolean,
    active ?: boolean,
    album ?: Album | null,
    photo ?: Deviation | null,
    color ?: string
}

export const FavoriteStar = ({photo, album, sx, blocked, active=false, color="yellow"} : FavoriteStarProps) => {
    const [favorited, setFavorited] = useState(active)

    useEffect(()=>{
        setFavorited(active);
    }, [active])

    useEffect(()=>{
        if(album?.favorited) {
            if(album.favorited !== favorited){
                setFavorited(!favorited);
            }
        } else setFavorited(false)
    }, [album])

    
    const favoriteAlbum = () => {
        const favorite = async (album : Album) => {
            let response : any = null;
            await axios.post(`albums/favorite`, album, {
                sendToken : true
            }).then((resp) => response = resp)
            .catch((err) => console.log(err))

            .finally(() => {
                if(response !== null) {
                    setFavorited(true);
                    album.favorited = true;
                }
            })
            
            return response;
        }

        if(album) {
            favorite(album);
        }
    }

    const unFavoriteAlbum = () => {
        const unfavorite = async (album : Album) => {
            let response : any = null;

            await axios.delete(`author/${album.author}/albums/${album.code}`, {
                params : {provider: album.provider},
                sendToken : true
            }).then((resp) => response = resp)
            .catch((err) => console.log(err))

            .finally(() => {
                if(response !== null) {
                    setFavorited(false);
                    album.favorited = false;
                }
            });
                
            return response;
        }

        if(album) {
            unfavorite(album);
        }
    }

    const handleClick = () => {
        if(favorited) unFavoriteAlbum();
        else favoriteAlbum();
        console.log("click", favorited)
    }

    return (
        <Star onClick={handleClick} $color={color}>
            {favorited ? <StarRateRoundedIcon sx={sx}/> : <StarBorderRoundedIcon sx={sx}/>}
        </Star>
    )
}

const Star = styled.div<{$color : string}>`
    color: ${props => props.$color};
    &:hover {
        cursor: pointer;
    }
`