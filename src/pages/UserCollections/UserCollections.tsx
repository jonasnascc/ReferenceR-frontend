import React, { useState } from "react";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";
import { CreateCollectionModal } from "../../shared/components/CollectionsModal/CreateCollectionModal";
import { OutlinedButton } from "../../shared/components/Buttons/styles";

export const UserCollectionsPage = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
        <OutlinedButton color="white" onClick={() => setOpenModal(true)}>Create Collection</OutlinedButton>
        <CreateCollectionModal
            open={openModal}
            onClose={() => setOpenModal(false)}
        />
        <GalleryBlock userCollections/>
        </>
    )
}