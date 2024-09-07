import { Box, Divider, Modal } from "@mui/material"
import { CustomButton, OutlinedButton } from "../Buttons/styles"
import { CreateForm, FormControl, FormInput, FormLabel, FormTextArea, ModalBox, ModalHeader, ModalPh } from "./styles"

import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useMutation } from "react-query";
import { createCollection } from "../../../api/services/Collection";

type CollectionsModalProps = {
    open : boolean,
    onClose : () => void
}

export const CollectionsModal = ({open, onClose} : CollectionsModalProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const saveMutation = useMutation("create-collection", () => createCollection({name, description}))

    const handleNameChange = (event: any) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value)
    }

    const handleSave = (event:any) => {
        event.preventDefault()
        saveMutation.mutate()
    }
    return(
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="Collections"
        >
            <ModalPh>
                <ModalBox>
                    <ModalHeader>
                        Create Collection
                        <CustomButton onClick={onClose}><CloseIcon/></CustomButton>
                    </ModalHeader>
                    <Divider style={{backgroundColor: "white"}}/>

                    <CreateForm onSubmit={(event:any) => {
                        event.preventDefault()
                        handleSave(event)
                    }}>
                        
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <FormInput name="name" placeholder="Type an unique name" onChange={handleNameChange}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <FormTextArea rows={3} name="description" placeholder="Type a description" onChange={handleDescriptionChange}></FormTextArea>
                        </FormControl>

                        <OutlinedButton color="white">Create</OutlinedButton>
                    </CreateForm>

                </ModalBox>
            </ModalPh>
        </Modal>
    )
}