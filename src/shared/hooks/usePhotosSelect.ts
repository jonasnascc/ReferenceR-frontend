import { useState } from "react";
import { CollectionPhoto } from "../../model/collection";
import { Deviation } from "../../model/photo";

export const usePhotosSelect = (photos : Deviation[]) => {
    const [isSelectingAll, setSelectingAll] = useState(false)
    const [selectedPhotos, setSelectedPhotos] = useState<CollectionPhoto[]>([])
    const [notSelectedPhotos, setNotSelectedPhotos] = useState<CollectionPhoto[]>([])

    const [selectMode, setSelectMode] = useState(false)

    const handleSelectMode = (state ?: boolean) => {
        const newState = state ? state : !selectMode;
        if(!newState) 
            handleClearSelection()
        
        setSelectMode(newState)
    }


    const handleSelectPhoto = (photo : CollectionPhoto) => {
        if(selectMode) {
            if(isSelectingAll) togglePhotoSelected(photo, !notSelectedPhotos.includes(photo))
            
            else togglePhotoSelected(photo, !selectedPhotos.includes(photo))
        }
    }

    const togglePhotoSelected = (photo : CollectionPhoto, selected:boolean) => {
        if(selected) selectPhoto(photo)
        else unselectPhoto(photo)
    }

    const selectPhoto = (photo : CollectionPhoto) => {
        if(!isSelectingAll) 
            setSelectedPhotos((prev) => [...prev, photo])

        else {
            if((photos.length < 100) && ((notSelectedPhotos.length+1) > 60)){
                const delArray = [...notSelectedPhotos, photo]

                const allPhotos : CollectionPhoto[] = photos.map(ph => {return {code: ph.code, page: ph.page, albumCode: ""}}) 

                const selArray : CollectionPhoto[] = allPhotos.filter(ph => !delArray.includes(photo))

                setSelectedPhotos(() => selArray)
                setNotSelectedPhotos([])
                setSelectingAll(false)
            }
            
            else setNotSelectedPhotos((prev) => [...prev, photo])
        }
    }

    const unselectPhoto = (photo : CollectionPhoto) => {
        if(!isSelectingAll) {
            const filtered = selectedPhotos.filter(code => code !== photo);
            setSelectedPhotos(filtered)
        }
        else{
            const filtered = notSelectedPhotos.filter(code => code !== photo);
            setNotSelectedPhotos(filtered)
        }
        
    }

    const handleClearSelection = () => {
        setSelectedPhotos([])
        setNotSelectedPhotos([])
        setSelectingAll(false)
    }

    const handleSelectAllPhotos = () => {
        if(isSelectingAll) handleClearSelection()
        else {
            setSelectedPhotos([])
            setSelectingAll(true)
        }
    }

    return{
        selectedPhotos,
        notSelectedPhotos,
        selectMode,
        isSelectingAll,
        handleSelectMode,
        handleSelectPhoto,
        handleSelectAllPhotos,
        handleClearSelection,
    }
}