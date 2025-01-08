import { CollectionPhotosSelection } from "../../../model/album"

export type CollectionsModalProps = {
    open : boolean,
    onClose : () => void
}

export type CollectionsListModalProps = {
    selectedAlbums:CollectionPhotosSelection[]
}