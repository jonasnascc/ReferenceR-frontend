import { useContext, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/Auth/AuthContext";

export const Layout = () => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        console.log(auth)
    }, [])

    return (
        <>
            <NavBar/>
            <BodyContainer>
                <Outlet/>
            </BodyContainer>
        </>
    )
}

const BodyContainer = styled.div`
    padding-top : 70px;
    
`