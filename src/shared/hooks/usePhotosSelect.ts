import { useEffect, useState } from "react";
import { AlbumCollection, CollectionPhoto } from "../../model/collection";
import { Deviation } from "../../model/photo";
import { Album } from "../../model/album";

export const usePhotosSelect = (photos : Deviation[]) => {
    const [currentAlbum, setCurrentAlbum] = useState<Album>()
    const [selectRecord, setSelectRecord] = useState<Record<string,AlbumCollection>>({})
    const [isSelectingAll, setSelectingAll] = useState(false)
    const [selectedPhotos, setSelectedPhotos] = useState<CollectionPhoto[]>([])
    const [notSelectedPhotos, setNotSelectedPhotos] = useState<CollectionPhoto[]>([])

    const [selectMode, setSelectMode] = useState(false)


    const handleChangeCurrentAlbum = (album: Album) => {
        if(currentAlbum && ((selectedPhotos.length>0) || (notSelectedPhotos.length>0))) {
            setAlbumSelectedPhotos({
                album: currentAlbum,
                selPhotos: selectedPhotos,
                except: notSelectedPhotos,
                append: true
            })
            
            setSelectedPhotos(selectRecord[album.code]?.photos??[]);
            setNotSelectedPhotos(selectRecord[album.code]?.exceptPhotos??[]);
            
        }

        setCurrentAlbum(album)
    }

    useEffect(() => {
        if(currentAlbum) {
            handleChangeCurrentAlbum(currentAlbum)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPhotos, notSelectedPhotos, currentAlbum])

    const handleSelectMode = (state ?: boolean) => {
        const newState = state ? state : !selectMode;
        if(!newState) 
            handleClearSelection()
        
        setSelectMode(newState)
    }

    // useEffect(() => {
    //     console.log({selectedPhotos, notSelectedPhotos, isSelectingAll})
    // },[selectedPhotos, notSelectedPhotos, isSelectingAll])


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
            
            else 
                setNotSelectedPhotos((prev) => [...prev, photo])
            
        }
    }

    const unselectPhoto = (photo : CollectionPhoto, album?:Album) => {
        if(!isSelectingAll) {
            const filtered = selectedPhotos.filter(ph => ph.code !== photo.code);
            setSelectedPhotos(filtered)
        }
        else{
            const filtered = notSelectedPhotos.filter(ph => ph.code !== photo.code);
            setNotSelectedPhotos(filtered)
        }
        
    }

    const setAlbumSelectedPhotos = (props : {album:Album, selPhotos ?: CollectionPhoto[], except?: CollectionPhoto[], append?:boolean}) => {
        const {album, selPhotos, except, append} = props

        const record = selectRecord
        if(!Object.keys(record).includes(album.code)) {
            record[album.code] = {
                album: album,
                photos: [],
                exceptPhotos: [],
                saveAsFavorite: false
            }
        }

        if(selPhotos) {
            if(append) record[album.code].photos = [...record[album.code].photos, ...selPhotos.filter(ph => record[album.code].photos.filter(photo => photo.code === ph.code).length === 0)]
            record[album.code].photos = selPhotos
        }
        if(except) {
            if(append) record[album.code].exceptPhotos = [...record[album.code].photos, ...except.filter(ph => record[album.code].exceptPhotos.filter(photo => photo.code === ph.code).length === 0)]
            record[album.code].exceptPhotos = except
        }

        console.log(record)
        setSelectRecord(record);
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
        selectRecord,
        isSelectingAll,
        handleChangeCurrentAlbum,
        handleSelectMode,
        handleSelectPhoto,
        handleSelectAllPhotos,
        handleClearSelection,
    }
}