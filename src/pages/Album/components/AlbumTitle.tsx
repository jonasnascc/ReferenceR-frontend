import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Album } from "../../../types/album";
import { FavoriteStar } from "../../../shared/components/FavoriteStar";

type AlbumTitleProps = {
    album : Album | null,
    selectedSize : number
}

export const AlbumTitle = ({album, selectedSize} : AlbumTitleProps) => {
    return (
        <AlbumTitleContainer>
            <FavoriteStarContainer>
                <FavoriteStar album={album} color="#ff9f0f"/>
            </FavoriteStarContainer>
            <Box textAlign={"center"}>
                <p>{album?.name??""}</p>
                {selectedSize > 0 && <>
                    <SelectedText>
                        <SelectedNumber>{`${selectedSize}`}</SelectedNumber>{` selected.`}
                    </SelectedText> 
                </>}
            </Box>
        </AlbumTitleContainer>
    )
}

const AlbumTitleContainer = styled.div`
    position: relative;
    margin: 20px 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 0px 55px;
`

const SelectedNumber = styled.span`
    margin:0;
    padding: 0;
    color: green;
`

const SelectedText = styled.span`
    font-size: 15px;
`

const FavoriteStarContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    height: 100%;
    left : 30px;
`