import { Album } from "../../../model/album"
import { PhotoCodeByPage } from "../../../model/collection"

export type CollectionsModalProps = {
    open : boolean,
    onClose : () => void
}

export type CollectionsListModalProps = {
    selectedPhotos ?: PhotoCodeByPage[],
    album?:Album,
    exceptPhotos?: PhotoCodeByPage[]
}