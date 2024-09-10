import { AlbumCollection } from "../../../model/collection"

export type CollectionsModalProps = {
    open : boolean,
    onClose : () => void
}

export type CollectionsListModalProps = {
    selectedAlbums:AlbumCollection[]
}