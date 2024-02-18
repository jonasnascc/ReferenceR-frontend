import React, { useEffect, useState } from "react";
import { Deviation } from "../../types/photo";
import { SxProps, Theme } from "@mui/material";

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import styled from "styled-components";
import { Album } from "../../types/album";
import { useMutation } from "react-query";
import { favoriteAlbum, unfavoriteAlbum } from "../../api/services/Album";


type FavoriteStarProps = {
    sx?:SxProps<Theme>,
    blocked ?: boolean,
    active ?: boolean,
    album ?: Album | null,
    photo ?: Deviation | null,
    color ?: string,
    disableInactive ?: boolean
}

export const FavoriteStar = ({album, sx, active=false, color="yellow", blocked = false, disableInactive = false} : FavoriteStarProps) => {
    const [favorited, setFavorited] = useState(active);

    const favoriteAlbumMutation = useMutation(["favorite"], (album : Album) => favoriteAlbum(album), {
        onSuccess: () => switchFavorite(true)
    });
    
    const unFavoriteAlbumMutation = useMutation(["unfavorite"], (album:Album) => unfavoriteAlbum(album), {
        onSuccess: () => switchFavorite(false)
    })

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

    const switchFavorite = (state:boolean) => {
        if(album) {
            setFavorited(state);
            album.favorited = state;
        }
    }

    const handleFavoriteAlbum = () => {
        if(album){
            favoriteAlbumMutation.mutate(album);
        }
    }

    const handleUnFavoriteAlbum = () => {
        if(album){
            unFavoriteAlbumMutation.mutate(album);
        }
    }

    const handleClick = () => {
        if(!blocked) {
            if(favorited) handleUnFavoriteAlbum();
            else handleFavoriteAlbum();
        }
    }

    return (
        <>
        {(disableInactive && !favorited) ? null : (
            <Star onClick={handleClick} $color={color}>
                {favorited ? <StarRateRoundedIcon sx={sx}/> : <StarBorderRoundedIcon sx={sx}/>}
            </Star>
        )}
        </>
    )
}

const Star = styled.div<{$color : string}>`
    color: ${props => props.$color};
    &:hover {
        cursor: pointer;
    }
`