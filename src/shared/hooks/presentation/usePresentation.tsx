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
        
        let newCurrentPhotoIndex = currentPage;
        if(currentPage === photos.length-1)
            newCurrentPhotoIndex += 1

        const data : Page = { data: {
            photo : resp[0]??null,
            albumCode: selAlbum.code,
            albumAuthor: selAlbum.author,
            page : pageParam
        }, page: pageParam };

        const newPhotos = [...photos, data.data]
        setPhotos((prev) => newPhotos)
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
    ,[currentPage, photos])

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


    const setPresentationPhoto = (photoCode : string|null) => {
        if(!photoCode) {
            setCurrentPhoto(null)
            setCurrentPage(0)
            return;
        }
        const result = photos.map(ph => ph.photo?.code)
        if(result.length===0) return;

        changePage(result.indexOf(photoCode))
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