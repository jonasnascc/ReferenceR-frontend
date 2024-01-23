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
    const search = useContext(SearchContext);

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

    const fetchPhotos = async () => {
        if(album!==null){
            setLoading(true);
            await axios.get(`author/${author}/albums/${album.code.replace(`deviantart-${author}`, "all").replace("deviantart-", "")}/photos?provider=${provider}&page=${page}&limit=${photosPerPage}`, {
                sendToken : true
                })
                .then((response) => {
                    setPhotos((response.data as Deviation[]).sort((a,b) => a.id - b.id));
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

    return {
        photos,
        page,
        lastPage,
        changePage,
        hasNext,
        loading
    }
}

export default usePhotos;