import { Checkbox, Divider, Modal } from "@mui/material"
import { CollectionsModalProps } from "./types"
import { ColList, ColListEl, ListCheckbox, ListModalBox, ModalHeader, ModalPh, SearchInput } from "./styles"
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton, OutlinedButton } from "../Buttons/styles"
import { useQuery } from "react-query";
import { listUserCollections } from "../../../api/services/Collection";
import { UserCollection } from "../../../model/collection";
import { useState } from "react";
import { CustomInput } from "../Inputs/styles";


export const CollectionsListModal = ({open, onClose} : CollectionsModalProps) => {
    const [search, setSearch] = useState("")
    const [checkedCols, setCheckedCols] = useState<UserCollection[]>([])

    const {data} = useQuery<UserCollection[]>(["user-collections"], () => listUserCollections())

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
                    <SearchInput onChange={handleChange}/>
                    <div>{search&&"results"}</div>
                    <ColList>
                    {
                        data&&data.filter(col => search ? col.name.toLowerCase().includes(search.toLowerCase().trim()) : col).map((col, index) => (
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
                        
                    }
                    </ColList>
                    <OutlinedButton color="#D217E2">Save</OutlinedButton>
                </ListModalBox>
            </ModalPh>
        </Modal>
    )
}