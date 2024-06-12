import React, { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const RequireNoAuth = ({children, redirect} : {children:ReactNode, redirect?:string}) => {
    const {authenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(authenticated!==undefined&&authenticated) {
            if(redirect) navigate(redirect)
        }
    }, [authenticated, navigate, redirect])

    if(((authenticated!==undefined)&&(authenticated===false))) return(
        <>{children}</>
    )
    else return(null)
    
}