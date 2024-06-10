import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {signin} = useContext(AuthContext)

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        if(await signin(login, password)) {
            const from = location.state?.from
            if(from) navigate(from)
            else navigate("/")
        }else {
            setErrorMessage("An error ocurred while trying to sign in")
        }
    }

    const handleLoginChange = (event : any) => {
        setLogin(event.target.value)
    }

    const handlePasswordChange = (event : any) => {
        setPassword(event.target.value)
    }

    return (
        <form>
            {errorMessage && <span>{errorMessage}</span>}
            <br/>
            <label>Login:</label>
            <input
                type="text"
                id="login"
                name="login"
                onChange={handleLoginChange}
                value={login}
            />
            <br/>
            <label>Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
            />
            <button type="button" onClick={handleSubmit}>Sign in</button>
        </form>
    )
}