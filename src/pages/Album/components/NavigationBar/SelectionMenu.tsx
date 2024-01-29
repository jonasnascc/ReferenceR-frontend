import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';


export const SelectionMenu = ({onSelect} : {onSelect : (state:boolean) => void}) => {
    const [select, setSelect] = useState(false);

    const handleSelect = () => {
        setSelect(!select);
        onSelect(!select);
    }

    return(
        <SelectItemsContainer>
            <Tooltip title={select ? "DeSelect": "Select"} placement="top" >
                <SelectItemsButton onClick={handleSelect} $select={select}>
                    <LibraryAddCheckOutlinedIcon fontSize="small"/>
                </SelectItemsButton>
            </Tooltip>
        </SelectItemsContainer>
    )
}

const SelectItemsContainer = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    height: 100%;
    
`

const SelectItemsButton = styled.a<{$select ?: boolean}>`
    padding : 5px;
    cursor: pointer;
    border-radius: 8px;
    color: white;

    background-color : ${props => props.$select ? "rgba(0,0,0,0.5)" : "none"};

    &:hover {
        background-color : ${props => props.$select ? "none" : "rgba(0,0,0,0.3)"};
    }
`