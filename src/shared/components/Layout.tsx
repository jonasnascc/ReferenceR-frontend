import React from "react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export const Layout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}