import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { Navigate, useNavigate } from "react-router-dom";
import { RequireAuth } from "../../context/Auth/RequireAuth";
import { RequireNoAuth } from "../../context/Auth/RequireNoAuth";
import { AuthContext } from "../../context/Auth/AuthContext";

export const NavBar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signout();
    }

    return (
        <NavbarKeeper>
            <NavBarContainer>
                <Grid container>
                    <Grid item xs={2}>
                        <LogoBox>
                            <LogoText href="/">ReferenceR</LogoText>
                        </LogoBox>
                    </Grid>
                    <Grid item xs={8}>
                        <SearchBar/>
                    </Grid>
                    <Grid item xs={2}>
                        <RequireNoAuth>
                            <LoginButtonContainer>
                                <LoginButton onClick={handleLoginClick}>Entrar</LoginButton>
                            </LoginButtonContainer>
                        </RequireNoAuth>
                        <RequireAuth>
                            <LoginButtonContainer>
                                <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
                            </LoginButtonContainer>
                        </RequireAuth>
                    </Grid>
                </Grid>
            </NavBarContainer>
        </NavbarKeeper>
    )
}

const NavbarKeeper = styled.div`
    height: 70px;
`

const NavBarContainer = styled(Box)`
    display : flex;
    position: fixed;
    background-color: #4f5157;
    height: inherit;
    width: 100%;
    margin: 0px;
    padding: 0px;
    align-items : center;
    z-index : 100;
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

const LogoutButton = styled(LoginButton)`
    background-color : #c32828;
`