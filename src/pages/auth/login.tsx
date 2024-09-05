import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthButton, AuthForm, AuthFormControl, AuthFormTile, AuthInput, AuthInputLabel, AuthPageContainer, LogoDiv, LogoImg, LogoTitle } from "./styles";
import logo from "../../logo.svg"


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
        <AuthPageContainer>
            <AuthFormTile>
                <AuthForm>
                    {errorMessage && <span>{errorMessage}</span>}
                    <LogoDiv>
                        <LogoImg
                            alt="logo"
                            src={logo}
                        />
                        <LogoTitle>REFERENCER</LogoTitle>
                    </LogoDiv>
                    <AuthFormControl>
                        <AuthInputLabel>Login:</AuthInputLabel>
                        <AuthInput
                            type="text"
                            id="login"
                            name="login"
                            onChange={handleLoginChange}
                            value={login}
                        />
                    </AuthFormControl>
                    
                    <AuthFormControl>
                        <AuthInputLabel>Password:</AuthInputLabel>
                        <AuthInput
                            type="password"
                            id="password"
                            name="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </AuthFormControl>
                    
                    
                    <AuthButton type="submit" onClick={handleSubmit} btnType="login">SignIn</AuthButton>
                    <AuthButton type="button" onClick={handleSubmit} btnType="signup">Sign Up</AuthButton>
                </AuthForm>
            </AuthFormTile>
        </AuthPageContainer>
        
    )
}