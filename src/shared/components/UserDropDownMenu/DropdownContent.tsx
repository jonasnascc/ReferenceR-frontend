import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

type DropdownContentProps = {
    display : boolean, 
    handleCollapse : (value:boolean) => void

}

export const DropdownContent = ({display, handleCollapse} : DropdownContentProps) => {
    const {signout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        handleCollapse(false);
        signout();
    }

    const handleProfile = () => {
        handleCollapse(false);
        navigate("/user");
    }

    return (
        <Content $display={display}>
            <ContentList>
                <ListItem onClick={handleProfile}>Profile</ListItem>
                <ListItem onClick={handleLogout}>Logout</ListItem>
            </ContentList>
        </Content>
    )
}


const Content = styled.div<{$display : boolean}>`
    position: relative;
    ${props => !props.$display && "display: none;"}
    transition: display ease-in 0.7s;
    width: 100%;
    height: 100%;
`

const ContentList = styled.ul`
    margin : 0;
    padding: 0;
    list-style: none;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #adadad;
    }
`