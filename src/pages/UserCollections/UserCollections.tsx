import React, { useState } from "react";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";
import { CreateCollectionModal } from "../../shared/components/CollectionsModal/CreateCollectionModal";
import { OutlinedButton } from "../../shared/components/Buttons/styles";
import { CollectionsListModal } from "../../shared/components/CollectionsModal/CollectionsListModal";

export const UserCollectionsPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalList, setOpenModalList] = useState(false)
    return (
        <>
        <OutlinedButton color="white" onClick={() => setOpenModal(true)}>Create Collection</OutlinedButton>
        <OutlinedButton color="white" onClick={() => setOpenModalList(true)}>List Collections</OutlinedButton>
        <CreateCollectionModal
            open={openModal}
            onClose={() => setOpenModal(false)}
        />
        <CollectionsListModal
            open={openModalList}
            onClose={() => setOpenModalList(false)}
        />
        <GalleryBlock userCollections/>
        </>
    )
}