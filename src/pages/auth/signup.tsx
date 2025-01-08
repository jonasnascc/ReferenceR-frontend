import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthButton, AuthForm, AuthFormControl, AuthFormTile, AuthInput, AuthInputLabel, AuthPageContainer, LogoDiv, LogoImg, LogoTitle } from "./styles";
import logo from "../../logo.svg"


export const SignupPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {signup} = useContext(AuthContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        if(await signup(name, email, password, confirmPassword)) {
            const from = location.state?.from
            if(from) navigate(from)
            else navigate("/")
        }else {
            setErrorMessage("An error ocurred while trying to sign in")
        }
    }

    const handleNameChange = (event : any) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event : any) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event : any) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event : any) => {
        setConfirmPassword(event.target.value)
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
                        <AuthInputLabel>Name:</AuthInputLabel>
                        <AuthInput
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleNameChange}
                            value={name}
                        />
                    </AuthFormControl>

                    <AuthFormControl>
                        <AuthInputLabel>Email:</AuthInputLabel>
                        <AuthInput
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
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
                    
                    <AuthFormControl>
                        <AuthInputLabel>Confirm your password:</AuthInputLabel>
                        <AuthInput
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                        />
                    </AuthFormControl>

                    <AuthButton type="button" onClick={handleSubmit} btnType="signup">Sign Up</AuthButton>
                </AuthForm>
            </AuthFormTile>
        </AuthPageContainer>
        
    )
}