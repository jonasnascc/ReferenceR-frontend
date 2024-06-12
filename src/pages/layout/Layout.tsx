import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RequireNoAuth } from "../../context/RequireNoAuth";
import { RequireAuth } from "../../context/RequireAuth";
import { AuthContext } from "../../context/AuthContext";

export const Layout = () => {
    const {user, signout} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        if(await signout()) {
            navigate(location.pathname, {replace:true})
        }
    }

    return(
        <>
        <div>
            <RequireNoAuth>
                <button onClick={() => navigate("/login")}>Login</button>
            </RequireNoAuth>
            {
                user&&(
                    <RequireAuth>
                        <div><strong>user:</strong>{user.name}</div>
                        <button>Profile</button>
                        <button onClick={() => navigate("/user/collections")}>Collections</button>
                        <button onClick={handleLogout}>Logout</button>
                    </RequireAuth>
                )
            }
        </div>
        <Outlet/>
        </>
    )
}