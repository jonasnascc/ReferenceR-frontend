import { Tooltip } from "@mui/material";
import React, { useState } from "react";

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import styled from "styled-components";


export const DetailsMenu = ({onClick = () => {}} : {onClick : () => any}) => {
    const [selected, setSelect] = useState(false);

    const handleDetails = () => {
        setSelect(!selected);
        onClick();
    }

    return (
        <SelectItemsContainer>
            <Tooltip title={"Show Details"} placement="top" >
                <SelectItemsButton onClick={handleDetails} $select={selected}>
                    <InsertPhotoOutlinedIcon fontSize="small"/>
                </SelectItemsButton>
            </Tooltip>
        </SelectItemsContainer>
    )
}

const SelectItemsButton = styled.a<{$select?:boolean}>`
    padding : 5px;
    cursor: pointer;
    border-radius: 8px;

    color:white;

    background-color : ${props => props.$select ? "rgba(0,0,0,0.5)" : "none"};

    &:hover {
        background-color : ${props => props.$select ? "none" : "rgba(0,0,0,0.3)"};
    }
`

const SelectItemsContainer = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    height: 100%;
    
`