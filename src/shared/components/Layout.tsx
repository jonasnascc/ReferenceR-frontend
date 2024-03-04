import React from "react";
import { NavBar } from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MenuBar } from "./MenuBar";

export const Layout = () => {
    return (
        <BodyContainer>
            <NavBarContainer>
                <NavBar/>
            </NavBarContainer>
            
            <Content>
                <Outlet/>
            </Content>
        </BodyContainer>
    )
}
const NavBarContainer = styled.div`
    height: 130px;
`

const BodyContainer = styled.div`
    height: 100%;
    width: 100%;
`

const Content = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`