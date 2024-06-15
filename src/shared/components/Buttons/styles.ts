import styled from "@emotion/styled";

export const CustomButton = styled.button`
    all: unset;
    cursor: pointer;
`

export const SearchButton = styled(CustomButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255, .8);
    padding-right: 3px;
    text-decoration: none;
`

const AuthButton = styled(CustomButton)`
    color: white;
    padding: 5px .8vw;
    border-radius: 5px;
    font-weight: 600;
`

export const LoginButton = styled(AuthButton)`
    background-color: #D217E2;
`

export const LogoutButton = styled(AuthButton)`
    background-color: #e21717;
`