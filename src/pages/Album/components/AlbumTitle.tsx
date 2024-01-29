import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Album } from "../../../types/album";
import { Deviation } from "../../../types/photo";

type AlbumTitleProps = {
    album : Album | null,
    selectedSize : number
}

export const AlbumTitle = ({album, selectedSize} : AlbumTitleProps) => {
    return (
        <AlbumTitleContainer>
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
    margin: 20px 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`

const SelectedNumber = styled.span`
    margin:0;
    padding: 0;
    color: green;
`

const SelectedText = styled.span`
    font-size: 15px;
`