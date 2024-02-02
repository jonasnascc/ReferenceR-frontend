import React from "react";
import styled from "styled-components";
import { ShowPhotosButton } from "./ShowPhotosButton";
import { Divider } from "@mui/material";

type HeaderControlButtonsProps = {
    onExpand ?: (event: any) => any,
}

export const HeaderControlButtons = ({onExpand = () => null} : HeaderControlButtonsProps) => { //expand, select, delete, show
    return (
        <ButtonsDiv>
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