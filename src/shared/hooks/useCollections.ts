import { useMutation } from "react-query";
import { Album } from "../../model/album";
import { addPhotosToCollection } from "../../api/services/Collection";
import { AlbumCollection, CollectionPhoto, CollectionPhotos, UserCollection } from "../../model/collection";


export const useCollections = () => {
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotos}) => addPhotosToCollection(collectionId, photos))

    const handleAddPhotos = async (photos:CollectionPhotos, collectionId : number) => {
        await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    return {
        handleAddPhotos
    }
}