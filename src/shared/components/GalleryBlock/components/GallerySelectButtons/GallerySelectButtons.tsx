import { OutlinedButton } from "../../../Buttons/styles";
import { SelectButtonsDiv } from "./styles";

type GallerySelectButtonsProps = {
    active : boolean,
    selectingAll : boolean,
    onSelect : () => void,
    onSelectAll ?: () => void,
    onClearSelection ?: () => void,
}

export const GallerySelectButtons = ({
        active, 
        selectingAll,
        onSelect,
        onSelectAll = ()=>{},
        onClearSelection = ()=>{}
} : GallerySelectButtonsProps) => {
    return(
        <SelectButtonsDiv active={active}>
            <OutlinedButton color="white" 
                onClick={onSelect}
                active={active}
                activeColor="#D217E2"
            >
                Select
            </OutlinedButton>

            {active&&(
                <>
                <OutlinedButton 
                    color="white" 
                    onClick={onSelectAll}
                    active={selectingAll}
                    activeColor="#D217E2"
                >
                    All
                </OutlinedButton>

                <OutlinedButton color="white" onClick={onClearSelection}>Clear</OutlinedButton>

                <OutlinedButton color="white">Save to collection</OutlinedButton>

                </>
            )}
        </SelectButtonsDiv>
        
    )
}