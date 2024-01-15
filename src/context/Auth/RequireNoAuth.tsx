import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RequireNoAuth = ({children} : {children : JSX.Element}) => {
    const {authenticated} = useContext(AuthContext);

    return authenticated ? null : children;
}