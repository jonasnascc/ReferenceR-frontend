import { useContext, useEffect, useState } from "react"
import { Album } from "../../types/album"
import { Deviation, Tag } from "../../types/photo"
import { SearchContext } from "../../context/Search/SearchContext"
import { useQuery } from "react-query"
import { fetchAlbumPhotos, fetchPhotoTags } from "../../api/services/Photo"

const usePhotos = (
        author: string | null,
        album : Album | null,
        provider : string,
        photosPerPage : number
) => {
    const [photos, setPhotos] = useState<Deviation[]>([]);

    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(-1);

    const [selectedPhotos, setSelectedPhotos]= useState<Deviation[]>([]);
    const [currentPhoto, setCurrentPhoto]= useState<Deviation|null>(null);
    const [currentIndex, setCurrentIndex] = useState<number|null>(null);
    const [currentTags, setCurrentTags] = useState<Tag[]>([])
    const [viewMode, setViewMode] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    const search = useContext(SearchContext);

    const {isFetching : loading} = useQuery(["album-photos", page, album], () => fetchAlbumPhotos(album, (album?.author ? album.author : author) , (album?.provider ? album.provider : provider), page, photosPerPage), {
        enabled : album!==null && (author!==null || album.author !== "") && (provider !== null || album.provider !== ""),
        refetchOnWindowFocus : false,
        retry: 3,
        onSuccess : (data) => setPhotos( sortPhotos(data) )
    })

    const {isFetching : loadingTags} = useQuery(["photo-tags", currentPhoto], () => fetchPhotoTags(currentPhoto, (album?.provider ? album.provider : provider)), {
        enabled : currentPhoto !== null && (provider !== null || (album!==null && album.provider !== "")),
        refetchOnWindowFocus : false,
        onSuccess: (data) => setCurrentTags(data)
    })


    useEffect(()=>{
        changePage(1);
        setLastPage(~~Math.ceil((album?.size??1)/photosPerPage));
    }, [album])

    useEffect(() => {
        if(currentPhoto!==null){
            setViewMode(true);
        } else setViewMode(false);
    }, [currentPhoto])

    useEffect(() => {
        console.log("selected photos:",selectedPhotos)
    }, [selectedPhotos])


    const sortPhotos = (photos : Deviation[]) => {
        if(photos && photos.length >= 2)
            return photos.sort((a,b) => (a.code < b.code) ? 1: ((a.code > b.code) ? -1 : 0))
        else return photos;
    }

    const changePage = (newPage : number) => {
        if((newPage >= 1) && (newPage <= lastPage)){
            setPage(newPage);
            if(search.changePage) search.changePage(newPage);
        }
    }

    const handleSelectPhoto = (photo : Deviation) => {
        if(selectMode){
            if(currentPhoto!==null) {
                setSelectedPhotos([currentPhoto]);
                setCurrentPhoto(null);
            }

            if(selectedPhotos.filter(ph => ph.code === photo.code).length > 0){
                setSelectedPhotos(selectedPhotos.filter(ph => ph.code !== photo.code));
            } else {
                setSelectedPhotos([...selectedPhotos, photo]);
            }
        } else{
            if( currentPhoto!==null && photo.code===currentPhoto.code ) {
                setCurrentPhoto(null);
                setCurrentIndex(null);
                setCurrentTags([]);
            }
            else {
                setCurrentPhoto(photo);
                setCurrentIndex(photos.indexOf(photo));
            }
        }
    }

    const clearSelectedPhotos = () => {
        setCurrentPhoto(null);
        setSelectedPhotos([]);
        setCurrentTags([]);
    }

    const handleSelectMode = (state : boolean) => {
        setSelectMode(state);
        if(!state) {
            clearSelectedPhotos();
        }
    }

    const handleViewLastSelected = () => {
        if(selectMode && (selectedPhotos.length > 0)){
            setCurrentPhoto(selectedPhotos[selectedPhotos.length-1]);
        } else if(selectMode && viewMode) {
            setCurrentPhoto(null);
            setCurrentTags([]);
        }
    }

    const handlePreviousPhoto = () => {
        if(currentIndex !== null) {
            const newIndex = currentIndex - 1;
            if(newIndex >= 0) 
                handleSelectPhoto(photos[newIndex]);
        }
    }

    const handleNextPhoto = () => {
        if(currentIndex !== null) {
            const newIndex = currentIndex + 1;
            if(newIndex < photos.length) 
                handleSelectPhoto(photos[newIndex]);
        }
    }

    return {
        photos,
        page,
        lastPage,
        changePage,
        handleSelectPhoto,
        clearSelectedPhotos,
        currentPhoto,
        currentTags,
        loadingTags,
        viewMode,
        selectMode,
        handleSelectMode,
        selectedPhotos,
        handleViewLastSelected,
        loading,
        handleNextPhoto,
        handlePreviousPhoto
    }
}

export default usePhotos;