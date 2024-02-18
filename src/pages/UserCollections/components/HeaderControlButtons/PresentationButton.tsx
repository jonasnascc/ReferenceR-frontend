import React from "react";
import styled from "styled-components";

import AvTimerIcon from '@mui/icons-material/AvTimer';
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Album } from "../../../../types/album";

type PresentationButtonProps = {
    selectedAlbum ?: Album | null
}


export const PresentationButton = ({selectedAlbum} : PresentationButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/user/collections/chrono-presentation", {state: selectedAlbum});
    }

    return (
        <>{selectedAlbum!==null&&
            <Container onClick={handleClick}>
                <Tooltip title="Chrono Present Album" placement="top">
                    <AvTimerIcon style={{color: "#646464"}}/>
                </Tooltip>
            </Container>
        }</>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding : 0 5px;
    cursor: pointer;

    &:hover {
        cursor: pointer;
        background-color: #ebebeb;
    }
`