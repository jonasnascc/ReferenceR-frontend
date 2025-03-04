import React, { useState } from "react";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";
import { CreateCollectionModal } from "../../shared/components/CollectionsModal/CreateCollectionModal";
import { OutlinedButton } from "../../shared/components/Buttons/styles";
import { useCollections } from "../../shared/hooks/useCollections";
import { CollectionsContainer } from "./styles";

export const UserCollectionsPage = () => {
    const [openModal, setOpenModal] = useState(false)

    const props = useCollections()


    return (
        <CollectionsContainer>
        <OutlinedButton color="white" onClick={() => setOpenModal(true)}>Create Collection</OutlinedButton>
        <CreateCollectionModal
            open={openModal}
            onClose={() => setOpenModal(false)}
        />
        {props.photos&&<GalleryBlock
            {...props} 
            collectionsPage
            selectedAlbum={props.currentCollection}
            onDeletePhotos={props.handleDeletePhotos}
        />}
        </CollectionsContainer>
    )
}