import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";

export const Layout = () => {
    return(
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}