import styled from "styled-components";

export const NavBarDiv = styled.div`
    position: fixed;
    display: flex;

    padding-top: 25px;
    padding-bottom: 25px;

    width: 100%;

    top: 0;
    left: 0;
    z-index: 100;

    background-color: #D9EFFF;
`

export const Logo = styled.img`
    height: 65px;
`

export const ItemsList = styled.ul`
    display: flex;
    gap: 25%;
    text-decoration: none;
    list-style: none;
    font-size: 16px;
`

export const MenuListItem = styled.li`
    display: inline;
    position: relative;
`

export const ItemAnchor = styled.a`
    text-decoration : none;
    cursor: pointer;
`

export const LoginButtonContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;

`

export const LoginButton = styled.button`
    width : 73px;
    height : 34px;
    border-radius : 10px;
    background-color : #D217E2;
    color : white;
    border : none;
    font-size : 16px;
    cursor : pointer;
`

export const SubElipse = styled.div `
    position: absolute;
    background-color: #D217E2;
    border-radius: 50%;
    height: 3px;
    width: 90%;
`

