import { useState } from "react";
import { OutlinedButton } from "../../../Buttons/styles";
import { SelectButtonsDiv } from "./styles";
import { CollectionsListModal } from "../../../CollectionsModal/CollectionsListModal";
import { SimplePhoto } from "../../../../../model/photo";
import { Album } from "../../../../../model/album";
import { CollectionsListModalProps } from "../../../CollectionsModal/types";
import { useQueryClient } from "react-query";

type GallerySelectButtonsProps = {
    album:Album,
    active : boolean,
    selectingAll : boolean,
    selectingAny : boolean,
    onSelect : () => void,
    onSelectAll ?: () => void,
    onClearSelection ?: () => void,
    onDeleteSelected ?: () => void
}

export const GallerySelectButtons = ({
        active, 
        selectingAll,
        selectingAny,
        onSelect,
        onSelectAll = ()=>{},
        onClearSelection = ()=>{},
        onDeleteSelected = ()=>{},
        ...props
} : GallerySelectButtonsProps & CollectionsListModalProps) => {
    const [openCollectionsList, setOpenCollectionsList] = useState(false)
    const queryClient = useQueryClient()

    const handleAddToCollections = () => {
        queryClient.invalidateQueries(["user-collections"])
        setOpenCollectionsList(true)
    }

    const handleCloseCollectionsModal = () => {
        setOpenCollectionsList(false)
    }

    const handleDeletePhotos = () => {
        onDeleteSelected()
    }

    return(
        <>
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

                <OutlinedButton color="white" onClick={handleAddToCollections}>Save to collection</OutlinedButton>

                <OutlinedButton color="red" onClick={handleDeletePhotos}>Delete</OutlinedButton>

                </>
            )}
        </SelectButtonsDiv>
        <CollectionsListModal
            open={openCollectionsList}
            onClose={handleCloseCollectionsModal}
            
            {...props}
        />
        </>
        
    )
}