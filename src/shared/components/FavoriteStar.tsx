import React, { useEffect, useState } from "react";
import { Deviation } from "../../types/photo";
import { Box, SxProps, Theme } from "@mui/material";

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import styled from "styled-components";


type FavoriteStarProps = {
    photo : Deviation, 
    sx?:SxProps<Theme>,
    blocked ?: boolean,
    active ?: boolean
}

export const FavoriteStar = ({photo, sx, blocked, active=false} : FavoriteStarProps) => {
    const [favorited, setFavorited] = useState(active)

    useEffect(()=>{
        setFavorited(active);
    }, [active])

    const handleClick = () => {
        if(!blocked) {
            setFavorited(!favorited);
            photo.favorited = !favorited;
        }
    }

    return (
        <Star onClick={handleClick}>
            {favorited ? <StarRateRoundedIcon sx={sx}/> : <StarBorderRoundedIcon sx={sx}/>}
        </Star>
    )
}

const Star = styled.div`
    
`