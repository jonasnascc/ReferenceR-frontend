import React, { useState } from "react";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styled from "styled-components";
import { TextField, Tooltip, Typography } from "@mui/material";

export const NavigationButtons = ({onPageChange, page, pageLimit} : {onPageChange : (newPage:number) => void, page: number, pageLimit : number}) => {
    const handlePageChange = (newPage : number) => {
        if(newPage > pageLimit) {
            onPageChange(pageLimit);
        }
        else onPageChange(newPage);
    }

    const handleNext = () => {
        handlePageChange(page + 1);
    }

    const handleBefore = () => {
        handlePageChange(page - 1);
    }

    return (
        <ButtonsContainer>
            <Tooltip title="Voltar" placement="top" >
                <NavButton onClick={handleBefore}>
                    <NavigateBeforeIcon style={{color: `${page!==1 ? "white" : "light-gray"}`}}/>
                </NavButton>
            </Tooltip>
            <PageContent page={page} pageLimit={pageLimit} onPageChange={handlePageChange}/>
            <Tooltip title="Avançar" placement="top" >
                <NavButton onClick={handleNext}>
                    <NavigateNextIcon  style={{color: `${page!==pageLimit ? "white" : "light-gray"}`}}/>
                </NavButton>
            </Tooltip>
        </ButtonsContainer>
    );
}

const PageContent = ({page, pageLimit, onPageChange} : {page:number, pageLimit:number, onPageChange : (page: number) => void}) => {
    const[edit, setEdit] = useState(false);

    const handleClick = () => {
        if(!edit) setEdit(!edit);
    }

    const handleEnter = (event : any) => {
        const key = event.which || event.keyCode;
        if (key == 13) {
            onPageChange(event.target.value);
            setEdit(false)
        }
    }
    return (
        <>
        {
            edit ? (
                <PageTextContainer>
                    <TextField size="small" variant="standard" type="number" onKeyDown={handleEnter} placeholder={`${page}`} fullWidth/>
                </PageTextContainer>
            ): (
                <PageTextContainer onClick={handleClick}>
                    <Typography>{`${page}/${pageLimit}`}</Typography>
                </PageTextContainer>
            )
        }
        </>
    )
}

const ButtonsContainer = styled.div`
    display : flex; 
    padding-right : 20px;
    justify-content : center;
`

const NavButton = styled.a`
    display : flex;
    align-items: center;
    justify-content : center;
    padding: 8px;
    text-decoration : none;
    cursor: pointer;
    border-radius : 5px;

    &:active {
        background-color: rgba(0,0,0,0.1)
    }
`

const PageTextContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content : center;
    width: 50px;
`