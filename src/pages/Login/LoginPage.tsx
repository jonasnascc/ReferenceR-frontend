import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const handleLogin = async (values : {login:string, password:string}) => {
        if(await auth.signin(values.login, values.password))
            navigate('/')
        else navigate('/login');
    }

    return(
        <FormContainer>
            <FormDiv>
                <Formik
                    initialValues={{
                        login: '',
                        password: '',
                    }}
                    onSubmit={async (values) => {
                        handleLogin(values);
                    }}
                    >
                    <CustomForm>
                        <LogoText>ReferenceR</LogoText>
                        <Typography>Nome</Typography>
                        <Field as={TextField}
                            id="login"
                            name="login" 
                            size="small" 
                            sx={{
                                backgroundColor : "white",
                                borderRadius: "5px"
                            }}
                        />
                        <Typography>Senha</Typography>
                        <Field as={TextField} 
                            id="password" 
                            name="password" 
                            type="password" 
                            size="small" 
                            sx={{
                                backgroundColor : "white",
                                borderRadius: "5px"
                            }}
                        />
                        
                        <SubmitButton type="submit">Entrar</SubmitButton>
                    </CustomForm>
                </Formik>
            </FormDiv>
        </FormContainer>
    )
}

const LogoText = styled.p`
    color: white;
    font-size : 50px;
    font-family : "Inknut Antiqua";
    text-decoration : none;
    margin:0;
    margin-bottom: 50px;
    padding:0;
`

const SubmitButton = styled.button`
    display: block;
    margin-top: 20px;
    width: 100%;
    height: 40px;
    background-color: #1D2C51;
    font-size: 15px;
    color: white;
    border: none;
    border-radius : 15px;
    cursor : pointer;
`

const CustomForm = styled(Form)`
    text-align: center;
`

const FormContainer = styled.div`
    position: absolute;
    display : flex;
    justify-content : center; 
    align-items : center;
    height: 100%;
    width : 100%;
    z-index : -1;
`

const FormDiv = styled.div`
    display : flex;
    align-items:center;
    justify-content : center;
    background-color : #263866;
    border-radius : 15px;
    padding: 20px;
    height : 60%;
    width : 50%;
    color: white;
`