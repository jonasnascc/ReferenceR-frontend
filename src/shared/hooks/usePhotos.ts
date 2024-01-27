import { useContext, useEffect, useState } from "react"
import axios from "../../api/axios"
import { Album } from "../../types/album"
import { Deviation } from "../../types/photo"
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
    const [hasNext, setHasNext] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [selectedPhotos, setSelectedPhotos]= useState<Deviation[]>([]);
    const [currentPhoto, setCurrentPhoto]= useState<Deviation|null>(null);

    const search = useContext(SearchContext);

    useEffect(() => {
        const fetchTags = async () => {
            if(selectedPhotos[0]) {
                await axios.get(`deviations/tags?url=${selectedPhotos[0].deviationPage}`, {
                    sendToken: true
                }).then((resp) => setCurrentPhoto({...selectedPhotos[0], tags : resp.data}))
                .catch((err) => console.log(err))
            }
        }

        if(selectedPhotos.length > 0) {
            fetchTags();
        } else setCurrentPhoto(null);
    }, [selectedPhotos])

    useEffect(()=>{
        changePage(1);
        if(album!==null && album.photosQuantity <= photosPerPage) {
            setHasNext(false);
        } else setHasNext(true);

        setLastPage(~~Math.ceil((album?.photosQuantity??1)/photosPerPage));

        fetchPhotos();
    }, [album])

    useEffect(() => {
        fetchPhotos();
    }, [page])

    useEffect(() => {
        console.log(selectedPhotos)
    }, [selectedPhotos])

    const fetchPhotos = async () => {
        if(album!==null){
            setLoading(true);
            await axios.get(`author/${author}/albums/${album.code.replace(`deviantart-${author}`, "all").replace("deviantart-", "")}/photos?provider=${provider}&page=${page}&limit=${photosPerPage}`, {
                sendToken : true
                })
                .then((response) => {
                    setPhotos((response.data as Deviation[]).sort((a,b) => b.id - a.id));
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    const changePage = (newPage : number) => {
        if((newPage >= 1) && (newPage <= lastPage)){
            if(hasNext){
                setPage(newPage);
            
                const albumSize = (album?.photosQuantity??1);
                const numPhotos = newPage * photosPerPage;
                if((numPhotos + photosPerPage) > albumSize){
                    setHasNext(false);
                }
            }
            else setPage(newPage);
            if(search.changePage) search.changePage(newPage);
            
        }
    }

    const handleSelectPhoto = (photo : Deviation) => {
        if(selectedPhotos.includes(photo)) {
            setSelectedPhotos(selectedPhotos.filter(ph => ph.id !== photo.id));
        } else {
            // setSelectedPhotos([...selectedPhotos, photo]);
        }
        setSelectedPhotos([photo]);
    }

    const clearSelectedPhotos = () => {
        setSelectedPhotos([]);
    }

    return {
        selectedPhotos,
        photos,
        page,
        lastPage,
        changePage,
        hasNext,
        loading,
        handleSelectPhoto,
        clearSelectedPhotos,
        currentPhoto
    }
}

export default usePhotos;