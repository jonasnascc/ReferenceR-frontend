import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';


export const SelectionMenu = ({onSelect} : {onSelect : (state:boolean) => void}) => {
    const [select, setSelect] = useState(false);

    let color : string = select ? "#0070ff" : "black";

    const handleSelect = () => {
        setSelect(!select);
        onSelect(!select);
    }

    return(
        <SelectItemsContainer>
            <Tooltip title={select ? "DeSelect": "Select"} placement="top" >
                <SelectItemsButton onClick={handleSelect}>
                    <LibraryAddCheckOutlinedIcon fontSize="small" sx={{color:{color}}}/>
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

const SelectItemsButton = styled.a`
    padding : 5px;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        background-color : rgba(0,0,0,0.1);
    }
`