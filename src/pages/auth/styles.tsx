import styled from "@emotion/styled";
import { CustomButton } from "../../shared/components/Buttons/styles";

export const AuthPageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: #251B4F;
    color: white;

    display: flex;
    justify-content: center;
`

export const AuthFormTile = styled.div`
    position: relative;
    background-color: #140C34;
    width: 34.4vw;
    min-width: 440px;
    height: 100vh;
    padding: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
    min-width: 270px;
`

export const AuthFormControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const AuthInputLabel = styled.div`

`

export const AuthInput = styled.input`
    all: unset;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    color: black;
    padding: 0 .5vw;
`

export const LogoDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LogoTitle = styled.h2`
    margin: 0;
    font-family: Inter;
    font-weight: 300;
    font-size: 43px;
`

export const LogoImg = styled.img`
    width: 96px;
`

export const AuthButton = styled(CustomButton)<{btnType:"login"|"signup"}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: ${props => props.btnType==="login" ? "#3D298E" : "#D217E2" };
`