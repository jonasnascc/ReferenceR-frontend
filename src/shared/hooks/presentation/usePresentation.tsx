import { useInfiniteQuery } from "react-query"
import { Album } from "../../../model/album"
import { fetchAlbumPhotos } from "../../../api/services/Photo"
import { Deviation } from "../../../model/photo"
import { useEffect, useState } from "react"

type PresentationPhoto= {
    photo: Deviation | null,
    albumCode:string,
    albumAuthor:string,
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
            albumCode: "",
            albumAuthor:"",
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
    
        return { data: {
            photo : resp[0]??null,
            albumCode: selAlbum.code,
            albumAuthor: selAlbum.author,
            page : pageParam
        }, page: pageParam };
    }

    const {
        data:infPages,
        hasNextPage:hasNextPhoto,
        fetchNextPage:fetchNextPhoto,
        fetchPreviousPage:fetchPreviousPhoto,

    } = useInfiniteQuery<Page>({
        enabled: albums&&albums.length > 0,
        queryKey: [`presentation-${uniqueKey}`],
        queryFn: fetchRandomPhotoFn,
        getNextPageParam: () => {
            return getRandomPage();
        }
    })

    useEffect(() => {
        if(!albums) return;
        const pgs = infPages?.pages
        if(!pgs) return;

        const mappedData = pgs.map(pg => pg.data);
        setPhotos(mappedData)
    }, [albums, infPages])

    useEffect(() => {
        if(currentPage!==-1) setCurrentPhoto(photos[currentPage]?.photo??null)
    }, [photos, currentPage, albums])


    const handleNextPhoto = () => {
        if(albums) {
            fetchNextPhoto()
            setCurrentPage((current) => current+1)
        }
        else if(currentPage < photos.length-1)
            setCurrentPage((current) => current+1)
            
    
    }

    const handlePreviousPhoto = () => {
        if(albums) {
            if(photos.length <= 1) return; 
            fetchPreviousPhoto()
            setCurrentPage((current) => current-1)
        }
        else if(currentPage >= 1){
            setCurrentPage((current) => current-1)
        }
    }

    const setPresentationPhoto = (photoCode : string|null) => {
        if(!photoCode) setCurrentPhoto(null)
        const result = photos.filter(ph => ph.photo?.code===photoCode)
        if(result.length===0) return;
        setCurrentPhoto(result[0].photo)
    }

    return {
        currentPhoto,
        photos,
        setPhotos,
        setPresentationPhoto,
        handleNextPhoto,
        handlePreviousPhoto,
        hasNextPhoto
    }

}