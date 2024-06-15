import React, { useContext } from "react";
import { RequireAuth } from "../../../context/RequireAuth";
import { RequireNoAuth } from "../../../context/RequireNoAuth";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo, LogoImage, LogoText, NavBarContainer, RightSection } from "./styles";
import { Button } from "@mui/material";
import LogoImg from '../../../logo.svg'
import { BarMenu } from "./BarMenu";
import { SearchInput } from "../../../shared/components/Inputs/SearchInput/SearchInput";
import { LoginButton, LogoutButton } from "../../../shared/components/Buttons/styles";

export type MenuItem = {
    text:string, 
    path:string, 
    requireAuth?: boolean
}

export const menuItems : MenuItem [] = [
    {
        text: "Home",
        path: "/"
    },
    {
        text: "Profile",
        path: "/user/profile",
        requireAuth: true
    },
    {
        text: "Collections",
        path: "/user/collections",
        requireAuth: true
    }
] 

export const ignorePathnames = [
    "/",
    "/login",
    "/signup"
]

export const NavBar = () => {
    const {user, signout} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        if(await signout()) {
            navigate(location.pathname, {replace:true})
        }
    }
    
    if(ignorePathnames.includes(location.pathname)) return (null)
    return(
        <NavBarContainer>
            <Logo href="/">
                <LogoImage src={LogoImg} alt="logo"/>
                <LogoText>REFERENCER</LogoText>
            </Logo>
            <BarMenu/>
            <SearchInput/>
            <RightSection>
                <RequireNoAuth>
                    <LoginButton onClick={() => navigate("/login")}>Sign in</LoginButton>
                </RequireNoAuth>
                <RequireAuth>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </RequireAuth>
            </RightSection>
        </NavBarContainer>
    )
}