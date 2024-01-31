import { useContext, useEffect, useState } from "react"
import axios from "../../api/axios"
import { Album } from "../../types/album"
import { Deviation, Tag } from "../../types/photo"
import { SearchContext } from "../../context/Search/SearchContext"

const usePhotos = (
        author: string,
        album : Album | null,
        provider : string,
        photosPerPage : number
) => {
    const [photos, setPhotos] = useState<Deviation[]>([]);

    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(-1);

    const [selectedPhotos, setSelectedPhotos]= useState<Deviation[]>([]);
    const [currentPhoto, setCurrentPhoto]= useState<Deviation|null>(null);
    const [currentTags, setCurrentTags] = useState<Tag[]>([])
    
    const [loading, setLoading] = useState(false);
    const [loadingTags, setLoadingTags] = useState(false);

    const [viewMode, setViewMode] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    const search = useContext(SearchContext);
    
    useEffect(()=>{
        changePage(1);
        setLastPage(~~Math.ceil((album?.size??1)/photosPerPage));
        fetchPhotos();
    }, [album])

    useEffect(() => {
        if(currentPhoto!==null){
            setViewMode(true);
        } else setViewMode(false);
    }, [currentPhoto])

    useEffect(() => {
        console.log("selected photos:",selectedPhotos)
    }, [selectedPhotos])

    const fetchPhotos = async () => {
        if(album!==null){
            setLoading(true);
            await axios.get(`author/${author}/albums/${album.code}/photos?provider=${provider}&page=${page}&limit=${photosPerPage}&maxThumbSize=300`,{sendToken : true})
            .then((response) => {
                setPhotos((response.data as Deviation[]).sort((a,b) => b.id - a.id));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
        }
    }

    const fetchTags = async () => {
        if(currentPhoto!==null) {
            setLoadingTags(true);

            await axios.get(`deviations/tags?url=${currentPhoto.deviationPage}`, { sendToken: true })
                .then((resp) => setCurrentTags(resp?.data ?? []))
                .catch((err) => console.log(err))
                .finally(() => setLoadingTags(false));
        }
    }

    const changePage = (newPage : number) => {
        if((newPage >= 1) && (newPage <= lastPage)){
            fetchPhotos();
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

            if(selectedPhotos.filter(ph => ph.id === photo.id).length > 0){
                setSelectedPhotos(selectedPhotos.filter(ph => ph.id !== photo.id));
            } else {
                setSelectedPhotos([...selectedPhotos, photo]);
            }
        } else{
            if( currentPhoto!==null && photo.id===currentPhoto.id ) {
                setCurrentPhoto(null);
                setCurrentTags([]);
            }
            else {
                setCurrentPhoto(photo);
                fetchTags();
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
            fetchTags();
        } else if(selectMode && viewMode) {
            setCurrentPhoto(null);
            setCurrentTags([]);
        }
    }

    return {
        photos,
        page,
        lastPage,
        changePage,
        loading,
        handleSelectPhoto,
        clearSelectedPhotos,
        currentPhoto,
        currentTags,
        loadingTags,
        viewMode,
        selectMode,
        handleSelectMode,
        selectedPhotos,
        handleViewLastSelected
    }
}

export default usePhotos;