import React from "react";
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Navigation } from "react-router-dom";

type NavigationButtonsProps = {
    onClickBack : () => void,
    onClickForward : () => void
}

export const NavigationButtons = ({onClickBack, onClickForward} : NavigationButtonsProps) => {



    return (
        <>
            <ButtonContainer $position="left" onClick={onClickBack}><ArrowBackIosIcon/></ButtonContainer>
            <ButtonContainer $position="right" onClick={onClickForward}><ArrowForwardIosIcon/></ButtonContainer>
        </>
    )
}

const ButtonContainer = styled.div<{$position: "left" | "right"}>`
    position: absolute;
    padding: 5px;
    display: flex;
    top: 50%;
    color: white;
    background-color: rgba(0,0,0,0.4);
    border-radius: 20px;

    cursor: pointer;

    ${props => props.$position==="left" ? "left : 10px;" : "right:10px;"}
`