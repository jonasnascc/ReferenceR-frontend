import React from "react";
import styled from "styled-components";
import { ShowPhotosButton } from "./ShowPhotosButton";
import { Divider } from "@mui/material";
import { PresentationButton } from "./PresentationButton";
import { Album } from "../../../../types/album";

type HeaderControlButtonsProps = {
    selectedAlbum ?: Album | null
}

export const HeaderControlButtons = ({selectedAlbum = null} : HeaderControlButtonsProps) => { //expand, select, delete, show
    return (
        <ButtonsDiv>
            <PresentationButton selectedAlbum={selectedAlbum}/>
            <Divider orientation="vertical"/>
            <ShowPhotosButton/>
        </ButtonsDiv>
    );
}

const ButtonsDiv = styled.div`
    display : flex;
    align-items : center;
    position: relative;
    height: 100%;
    width: 100%;
`