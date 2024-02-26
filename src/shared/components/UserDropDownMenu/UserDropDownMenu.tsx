import React, { useEffect, useRef, useState } from "react";
import { RequireAuth } from "../../../context/Auth/RequireAuth";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { User } from "../../../types/user";
import { DropdownContent } from "./DropdownContent";

type UserDropdownMenuProps = {
    user : User | null,
    collapse ?: boolean;
}

export const UserDropdownMenu = ({user, collapse} : UserDropdownMenuProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [totalWidth, setTotalWidth] = useState("0px");

    useEffect(() => {
        if(containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setTotalWidth(`${(width > 100) ? width : 100}px`)
        }
      }, [containerRef.current]);

    const handleClick = () => {
        setIsCollapsed((state) => !state);
    }

    if(user === null) return (null);
    return (
        <RequireAuth>
            <ButtonContainer ref={containerRef}>
                <DropdownButton onClick={handleClick}>
                    <AvatarTile $size="35px"/>
                    <Name>{user.name}</Name>
                </DropdownButton>
                <DropdownMenuTile $collapsed={isCollapsed} $width={totalWidth}>
                    <DropdownContent display={!isCollapsed}/>
                </DropdownMenuTile>
            </ButtonContainer>
        </RequireAuth>
    )
}

const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`


const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 10px;

    &:hover {
        background-color: #3c3d43;
        cursor: pointer;
    }
`

//height: ${props => props.$collapsed ? "0px" : "500px"};
const DropdownMenuTile = styled.div<{$collapsed : boolean, $width:string}>`
    position: fixed;
    top: 70px;
    right : 10px;
    width: ${props => props.$width};
    background-color: white;
    transition: height linear 0.2s;
    overflow: hidden;
    border-width: 0 3px 3px 3px;
    border-style: solid;
    border-color: #4f5157;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 100;
`

const AvatarTile = styled(Avatar)<{$size : string}>`
    height: ${props => props.$size} !important;
    width: ${props => props.$size} !important;
`

const Name = styled.span`
    margin-left: 10px;
    color: white;
    padding: 0;
`

