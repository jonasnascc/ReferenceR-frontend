import React from "react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MenuBar } from "./MenuBar";



export const Layout = () => {
    return (
        <BodyContainer>
            <NavBar/>
            <MenuBar/>
            
            <Content>
                <Outlet/>
            </Content>
        </BodyContainer>
    )
}

const BodyContainer = styled.div`
    height: 100%;
    width: 100%;
`

const Content = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`