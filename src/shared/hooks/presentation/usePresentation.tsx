import { useInfiniteQuery } from "react-query"
import { Album } from "../../../model/album"
import { fetchAlbumPhotos } from "../../../api/services/Photo"
import { Deviation, SimplePhoto } from "../../../model/photo"
import { useEffect, useState } from "react"

export type PresentationPhoto= {
    photo: Deviation | null,
    album : Album | null,
    page: number
}
interface Page {
    data: PresentationPhoto,
    page ?: number
}

export const usePresentation = (albums ?: Album[]) => {

    const [currentPage, setCurrentPage] = useState(albums ? 0 : -1)
    const [currentPhoto, setCurrentPhoto] = useState<Deviation|null>(null)

    const [photos, setPhotos] = useState<PresentationPhoto[]>([])
    const [uniqueKey] = useState(Date.now())
    

    const getRandomNumberInRange = (n: number, m: number): number => {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }

    const getRandomPage = () => {
        if(!albums) return;
        const sizes = albums.map(alb => alb.size);
        const sizesSum = sizes.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
        return getRandomNumberInRange(1, sizesSum - 1)
    }

    const fetchRandomPhotoFn = async ({pageParam = currentPage+1}) : Promise<Page> => {
        let selAlbum: Album | undefined;
        let cumulativeSize = 0;
    
        const emptyResp = { data: {
            photo : null,
            album : null,
            page : pageParam
        }, page: pageParam };

        if(!albums) return emptyResp

        for (let album of albums) {
            cumulativeSize += album.size;
            if (pageParam < cumulativeSize) {
                selAlbum = album;
                break;
            }
        }
        if (!selAlbum) return emptyResp;
    
        const resp = await fetchAlbumPhotos(
            selAlbum,
            selAlbum.author,
            selAlbum.provider,
            pageParam,
            1
        );
        
        let newCurrentPhotoIndex = currentPage;
        if(currentPage === photos.length-1)
            newCurrentPhotoIndex += 1

        const data : Page = { data: {
            photo : resp[0]??null,
            album: selAlbum,
            page : pageParam
        }, page: pageParam };

        const newPhotos = [...photos, data.data]
        setPhotos(() => newPhotos)
        setCurrentPhoto(newPhotos[newCurrentPhotoIndex]?.photo??null)

        return data;
    }

    const {
        hasNextPage:hasNextPhoto,
        fetchNextPage:fetchNextPhoto,
    } = useInfiniteQuery<Page>({
        enabled: albums&&albums.length > 0,
        queryKey: [`presentation-${uniqueKey}`],
        queryFn: fetchRandomPhotoFn,
        retry: 3,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        getNextPageParam: () => {
            return getRandomPage();
        }
    })

    
    const changePage = (page:number) => {
        if(page < 0) return;

        setCurrentPage(() => page)
        setCurrentPhoto(photos[page]?.photo??null)
    }

    useEffect(() => {
        if(albums && currentPage < photos.length) setCurrentPhoto(photos[currentPage]?.photo??null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[currentPage, photos])

    const handlePhotoChange = (index:number) => {
        if(index < photos.length) {
            const photo = photos[index];
            if(photo) setCurrentPhoto(photo.photo)
            return photo?.photo??null;
        }
        return null;
    }

    const handleIndexChange = (index:number) => {
        if(index < 0) return;

        if(albums) {
            if(index >= photos.length-4) fetchNextPhoto()
            changePage(index)
            
        }
        else  {
            if(index < photos.length){
                changePage(index)
            }
        }
    }

    const handleNextPhoto = () => {
        if(albums) {
            if(currentPage >= photos.length-4) fetchNextPhoto()
            changePage(currentPage+1)
        }
        else if(currentPage < photos.length-1)
            changePage(currentPage+1)
    }

    const handlePreviousPhoto = () => {
        if(albums) {
            if(photos.length <= 1 || currentPage < 1) return; 
            //fetchPreviousPhoto()
            setCurrentPage(currentPage - 1)
        }
        else if(currentPage >= 1){
            changePage(currentPage - 1)
        }
    }


    const setPresentationPhoto = (ph : SimplePhoto|null) => {
        if(!ph) {
            setCurrentPhoto(null)
            setCurrentPage(0)
            return;
        }
        const result = photos.map(ph => ph.photo?.code)
        if(result.length===0) return;

        changePage(result.indexOf(ph.code))
    }

    const getCurrentPhotoIndex = () => {
        if(!currentPhoto) return -1;
        const result = photos.filter(ph => ph.photo?.code === currentPhoto?.code)
        if(result.length === 0) return -1;
        return photos.indexOf(result[0])
    }

    const handlePhotosUpdate = (photos : Deviation[]) => {
        if(photos.length > 0) {
            const prPhotos = photos.map(ph => {return {
                photo: ph,
                album : null,
                page: -1
            }})

            setPhotos(() => prPhotos)
        }
    }

    return {
        currentPhoto,
        currentPage,
        photos,
        handlePhotosUpdate,
        setPresentationPhoto,
        getCurrentPhotoIndex,
        handlePhotoChange,
        handleIndexChange,
        handleNextPhoto,
        handlePreviousPhoto,
        hasNextPhoto
    }

}