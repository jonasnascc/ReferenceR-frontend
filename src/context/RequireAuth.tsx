import React, { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({children, redirect} : {children:ReactNode, redirect?:string}) => {
    const {authenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(authenticated!==undefined&&!authenticated) {
            if(redirect) navigate(redirect)
        }
    }, [authenticated, redirect])

    if(!authenticated) return(null)
    else return(
        <>{children}</>
    )
}