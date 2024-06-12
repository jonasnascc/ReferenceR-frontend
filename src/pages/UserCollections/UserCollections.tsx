import React from "react";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";

export const UserCollectionsPage = () => {
    return (
        <>
        <h1>User Collections</h1>
        <GalleryBlock userFavs/>
        </>
    )
}