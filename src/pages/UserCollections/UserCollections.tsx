import React, { useState } from "react";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";
import { CollectionsModal } from "../../shared/components/CollectionsModal/CollectionsModal";
import { OutlinedButton } from "../../shared/components/Buttons/styles";

export const UserCollectionsPage = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
        <OutlinedButton color="white" onClick={() => setOpenModal(true)}>Create Collection</OutlinedButton>
        <CollectionsModal
            open={openModal}
            onClose={() => setOpenModal(false)}
        />
        <GalleryBlock userCollections/>
        </>
    )
}