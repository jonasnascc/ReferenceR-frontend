import { Tooltip } from "@mui/material";
import React from "react";

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import styled from "styled-components";


export const DetailsMenu = ({onClick = () => {}} : {onClick : () => any}) => {

    const handleDetails = () => {
        onClick();
    }

    return (
        <SelectItemsContainer>
            <Tooltip title={"Show Details"} placement="top" >
                <SelectItemsButton onClick={handleDetails}>
                    <InsertPhotoOutlinedIcon fontSize="small" sx={{color:"black"}}/>
                </SelectItemsButton>
            </Tooltip>
        </SelectItemsContainer>
    )
}

const SelectItemsButton = styled.a`
    padding : 5px;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        background-color : rgba(0,0,0,0.1);
    }

    &:active {
        background-color : rgba(256,256,256,0.2);
    }
`

const SelectItemsContainer = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    height: 100%;
    
`