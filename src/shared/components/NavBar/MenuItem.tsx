import React, { useState } from "react";
import { ItemAnchor, MenuListItem, SubElipse } from "./styles";

type MenuItemProps = {
    label: string,
    onClick : () => void,
    active ?: boolean
}

export const MenuItem = ({label, onClick, active} : MenuItemProps) => {
    const [isHover, setIsHover] = useState(false);

    const handleEnter = () => {
        setIsHover(true);
    }

    const handleLeave = () => {
        setIsHover(false);
    }
    
    return (
        <MenuListItem onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <ItemAnchor onClick={onClick}>{label}</ItemAnchor>
            {
                (active || isHover) && (
                    <div className="align-hor">
                        <SubElipse/>
                    </div>
                )
            }
        </MenuListItem>
    )
}