import { Menu, MenuListItemAnchor, MenuListItemContent } from "./styles"
import { MenuItem, menuItems } from "./NavBar"
import { RequireAuth } from "../../../context/RequireAuth"
import { useLocation, useNavigate } from "react-router-dom"

export const BarMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const pathname = location?.pathname ?? ""

    return (
    <Menu>
    {
        menuItems.map((item, index) => (
            <MenuListItem 
                key={index} 
                item={item} 
                onClick={() => navigate(item.path)}
                selected={(pathname!=="/")&&(pathname === item.path)}
                visible={
                    item.hideOnPath ? pathname!==item.path : true
                }
            />
        ))
    }
    </Menu>
    )
}

const MenuListItem = ({item, selected, onClick, visible} : 
    {item : MenuItem, selected?: boolean, visible?:boolean, onClick?: () => void}) => {
    const handleClick = () => {
        if(onClick) onClick()
    }
    const getListItem = () => (
        <MenuListItemContent>
            <MenuListItemAnchor onClick={handleClick} selected={selected}>
                {item.text}
            </MenuListItemAnchor>
        </MenuListItemContent>
    )
    
    if(!visible) return null;

    if(item.requireAuth) 
        return <RequireAuth>{getListItem()}</RequireAuth>
    
    return getListItem()
}