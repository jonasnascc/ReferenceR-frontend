import React from "react";
import { ItemsList} from "./styles";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";


const MenuItems = [
    {
        label: "Home",
        path : "/"
    },
    {
        label: "Collections",
        path : "/user/collections"
    },
    {
        label: "Authors",
        path : "/authors"
    }
]


export const NavigationMenu = () => {
    const navigate = useNavigate();
    
    const handleClick = (path : string) => {
        navigate(path);
    }

    return (
        <div className="align-vert">
            <ItemsList>
            {
                MenuItems.map((item, index) => (
                    <MenuItem 
                        key={index} 
                        label={item.label} 
                        onClick={() => handleClick(item.path)}
                    />
                ))
            }
            </ItemsList>
        </div>
    )
}