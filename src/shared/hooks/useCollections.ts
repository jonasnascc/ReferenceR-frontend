import { useMutation } from "react-query";
import { Album } from "../../model/album";
import { addPhotosToCollection } from "../../api/services/Collection";
import { AlbumCollection, PhotoCodeByPage, UserCollection } from "../../model/collection";


export const useCollections = (
    selectedPhotos ?: PhotoCodeByPage[],
    album?:Album,
    exceptPhotos?: PhotoCodeByPage[],
) => {
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, albumCol} : {collectionId:number, albumCol:AlbumCollection}) => addPhotosToCollection(collectionId, albumCol))

    const handleAddPhotos = async (selectedCols : UserCollection[]) => {
        const albumCol : AlbumCollection = {
            albumCode : album?.code??null,
            photos : selectedPhotos??[],
            exceptPhotos: exceptPhotos,
            saveAsFavorite:false
        }

        selectedCols.forEach(col => addPhotos(albumCol, col.id))
    }

    const addPhotos = async (albumCol:AlbumCollection, collectionId : number) => {
        await postPhotosMutation.mutateAsync({collectionId, albumCol})
    }

    return {
        handleAddPhotos
    }
}