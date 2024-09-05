import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { ExpandButton } from './styles';

export const ControlPanelExpandButton = ({active, handleClick} : {active:boolean, handleClick: () => void}) => {
    const icon = active ? <KeyboardDoubleArrowUpIcon/>:<KeyboardDoubleArrowDownIcon/>
    
    
    return (
        <ExpandButton onClick={() => handleClick()} footer={active}>{icon}</ExpandButton>
    )
}