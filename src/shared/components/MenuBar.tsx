import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuItems = [
    {
        label: "Home",
        path : "/"
    },
    {
        label: "Albums",
        path : "/albums"
    },
    {
        label: "Authors",
        path : "/authors"
    }
]

export const MenuBar = () => {
    const navigate = useNavigate()

    const handleClick = (path : string) => {
        navigate(path);
    }

    return (
        <MenuContainer>
            <ItemsList>
            {
                MenuItems.map(item => (
                    <Item key={MenuItems.indexOf(item)}>
                        <ItemAnchor onClick={() => handleClick(item.path)}>{item.label}</ItemAnchor>
                    </Item>
                ))
            }
            </ItemsList>
        </MenuContainer>
    );
}

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
`

const ItemsList = styled.ul`
    text-decoration: none;
    list-style: none;
    font-size: 20px;
`

const Item = styled.li`
    margin: 0 50px;
    display: inline-block;
`
const ItemAnchor = styled.a`
    text-decoration : none;
    cursor: pointer;
`