import { Album } from "../../../model/album"
import { CollectionPhoto } from "../../../model/collection"

export type CollectionsModalProps = {
    open : boolean,
    onClose : () => void
}

export type CollectionsListModalProps = {
    selectedPhotos : CollectionPhoto[],
    album:Album,
    exceptPhotos: CollectionPhoto[]
}