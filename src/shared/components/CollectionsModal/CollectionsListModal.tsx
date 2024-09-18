import {  Divider, Modal } from "@mui/material"
import { CollectionsListModalProps, CollectionsModalProps } from "./types"
import { CollectionButton, CollectionButtonDiv, ColList, ColListEl, EmptyMessage, ListCheckbox, ListModalBox, ModalHeader, ModalPh, SearchInput, SearchInputDiv } from "./styles"
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from "../Buttons/styles"
import { useState } from "react";
import { useCollections } from "../../hooks/useCollections";
import SearchIcon from '@mui/icons-material/Search';
import { CreateCollectionModal } from "./CreateCollectionModal";
import { Album, UserCollection } from "../../../model/album";

export const CollectionsListModal = ({open, onClose, selectedAlbums} : CollectionsModalProps & CollectionsListModalProps) => {
    const [search, setSearch] = useState("")
    const [checkedCols, setCheckedCols] = useState<UserCollection[]>([])
    const [openCreation, setOpenCreation] = useState(false)

    const {userCollections, handleAddPhotos} = useCollections();

    const handleChange = (event:any) => {
        setSearch(event.target.value)
    }

    const handleClose = () => {
        setSearch("")
        onClose()
    }

    const handleCheck = (event: any, collection:UserCollection) => {
        const checked = event.target.checked;
        const hasCol = checkedCols.filter(col => col.id === collection.id).length > 0;
        
        if(checked){
            if(!hasCol) setCheckedCols(pos => [...pos, collection])
        } else {
            const newList = checkedCols.filter(col => col.id !== collection.id)
            if(hasCol) setCheckedCols(newList)
        }
    }   

    const handleSave = async () => {
        checkedCols.forEach(async col => {
            await handleAddPhotos(selectedAlbums, col.id)
        })
        onClose()
    }

    const handleCloseCreation = () => {
        setOpenCreation(false)
    }
    const handleCreateNew = () => {
        setOpenCreation(true)
    }
    
    return(
        <Modal
        open={open}
        onClose={handleClose}
        
        aria-labelledby="Collections"
        >
            <ModalPh>
                <ListModalBox>
                    <ModalHeader>
                        Collections List
                        <CustomButton onClick={onClose}><CloseIcon/></CustomButton>
                    </ModalHeader>
                    <Divider style={{backgroundColor: "white"}}/>
                    {
                    userCollections&&userCollections.length>0 &&<>
                        <SearchInputDiv>
                            <SearchInput onChange={handleChange}/>
                            <SearchIcon/>
                        </SearchInputDiv>
                        <div>{search&&"results"}</div>
                    </>
                    }
                    
                    <ColList>
                    {
                        userCollections&&userCollections.length>0 ? (
                            userCollections.filter(col => search ? col.name.toLowerCase().includes(search.toLowerCase().trim()) : col).map((col, index) => (
                                <ColListEl key={index}>
                                    <ListCheckbox 
                                        sx={{
                                            color: "#D217E2",
                                            '&.Mui-checked': {
                                                color: "#D217E2",
                                            },
                                        }}
                                        onClick={(event:any) => handleCheck(event, col)}
                                    />
                                    {col.name}
                                </ColListEl>
                            ))
                        ) : (
                            <EmptyMessage>You don't have collections yet.</EmptyMessage>
                        )
                    }
                    </ColList>
                    <CollectionButtonDiv>
                        {userCollections&&userCollections.length>0 &&
                            <CollectionButton btnType="save" onClick={handleSave}>Save</CollectionButton>
                        }
                        <CollectionButton btnType="create" onClick={handleCreateNew}>Create new collection</CollectionButton>
                    </CollectionButtonDiv>
                </ListModalBox>
                <CreateCollectionModal open={openCreation} onClose={handleCloseCreation}/>
            </ModalPh>
        </Modal>
    )
}