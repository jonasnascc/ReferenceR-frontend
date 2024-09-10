import { useEffect, useState } from "react";
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

    useEffect(() => {
        console.log({selectedPhotos, notSelectedPhotos, isSelectingAll})
    },[selectedPhotos, notSelectedPhotos, isSelectingAll])


    const handleSelectPhoto = (photo : CollectionPhoto) => {
        if(selectMode) {
            if(isSelectingAll) togglePhotoSelected(photo, notSelectedPhotos.filter(ph => ph.code === photo.code).length === 0)
            
            else togglePhotoSelected(photo, selectedPhotos.filter(ph => ph.code === photo.code).length === 0)
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

                const allPhotos : CollectionPhoto[] = photos.map(ph => {return {code: ph.code, page: ph.page}}) 

                const selArray : CollectionPhoto[] = allPhotos.filter(ph => delArray.filter(photo => ph.code === photo.code).length === 0)

                setSelectedPhotos(() => selArray)
                setNotSelectedPhotos([])
                setSelectingAll(false)
            }
            
            else setNotSelectedPhotos((prev) => [...prev, photo])
        }
    }

    const unselectPhoto = (photo : CollectionPhoto) => {
        if(!isSelectingAll) {
            const filtered = selectedPhotos.filter(ph => ph.code !== photo.code);
            setSelectedPhotos(filtered)
        }
        else{
            const filtered = notSelectedPhotos.filter(ph => ph.code !== photo.code);
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