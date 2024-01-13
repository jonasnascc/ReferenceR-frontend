import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { Navigate, useNavigate } from "react-router-dom";
import { RequireAuth } from "../../context/Auth/RequireAuth";

export const NavBar = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value : string) => {
        setSearchValue(value);
        console.log(searchValue);
    }

    const handleLoginClick = () => {
        navigate("/login");
    }
    return (
        <NavBarContainer>
            <Grid container>
                <Grid item xs={3}>
                    <LogoBox>
                        <LogoText href="/">ReferenceR</LogoText>
                    </LogoBox>
                </Grid>
                <Grid item xs={6}>
                    <SearchBar handleSearch={handleSearch}/>
                </Grid>
                <Grid item xs={3}>
                    <RequireAuth>
                        <LoginButtonContainer>
                            <LoginButton onClick={handleLoginClick}>Entrar</LoginButton>
                        </LoginButtonContainer>
                    </RequireAuth>
                </Grid>
            </Grid>
        </NavBarContainer>
    )
}

const NavBarContainer = styled(Box)`
    display : flex;
    position: fixed;
    background-color: #263866;
    height: 70px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    align-items : center;
`

const LogoText = styled.a`
    color: white;
    font-size : 28px;
    font-family : "Inknut Antiqua";
    text-decoration : none;
`

const LogoBox = styled(Box)`
    text-align : center;
    padding-top: 5px;
`

const LoginButtonContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;

`

const LoginButton = styled.button`
    width : 113px;
    height : 40px;
    border-radius : 15px;
    background-color : #1D2C51;
    color : white;
    border : none;
    font-family : "Inknut Antiqua";
    font-size : 18px;
    cursor : pointer;
`