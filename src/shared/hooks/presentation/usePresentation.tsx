import { useInfiniteQuery } from "react-query"
import { Album } from "../../../model/album"
import { fetchAlbumPhotos } from "../../../api/services/Photo"
import { Deviation } from "../../../model/photo"
import { useEffect, useState } from "react"

interface Page {
    data: Deviation[],
    page ?: number
}

export const usePresentation = (albums : Album[]) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPhoto, setCurrentPhoto] = useState<Deviation|null>(null)
    const [uniqueKey] = useState(Date.now())
    

    const getRandomNumberInRange = (n: number, m: number): number => {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }

    const getRandomPage = () => {
        const sizes = albums.map(alb => alb.size);
        const sizesSum = sizes.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
        return getRandomNumberInRange(1, sizesSum - 1)
    }

    const fetchRandomPhotoFn = async ({pageParam = currentPage}) => {
        let selAlbum: Album | undefined;
        let cumulativeSize = 0;
    
        for (let album of albums) {
            cumulativeSize += album.size;
            if (pageParam < cumulativeSize) {
                selAlbum = album;
                break;
            }
        }
        if (!selAlbum) return { data: [], page: pageParam };

    
        const resp = await fetchAlbumPhotos(
            selAlbum,
            selAlbum.author,
            selAlbum.provider,
            pageParam,
            1
        );
    
        return { data: resp, page: pageParam };
    }

    const {
        data,
        hasNextPage:hasNextPhoto,
        hasPreviousPage:hasPreviousPhoto,
        fetchNextPage:fetchNextPhoto,
        fetchPreviousPage:fetchPreviousPhoto,

    } = useInfiniteQuery<Page>({
        enabled: albums.length > 0,
        queryKey: [`presentation-${uniqueKey}`],
        queryFn: fetchRandomPhotoFn,
        getNextPageParam: (lastPage: Page, pages:Page[]) => {
            const filtered = pages.filter(pg => pg.page === currentPage)
            if(filtered.length===0)
                return currentPage
            else
                return filtered[0].page

        },
        getPreviousPageParam: (lastPage:Page, pages:Page[]) => {
            return lastPage?.page
        }
    })

    useEffect(() => {
        if(data?.pages){
            if(data.pages.length>0){
                const page = data.pages.filter(pg => pg.page === currentPage)
                if(page.length > 0){
                    setCurrentPhoto(page[0]?.data[0]??null)
                }
            }
        }
        console.log(data)
    }, [currentPage, data])

    const handleNextPhoto = () => {
        const pages = data?.pages
        if(!pages) return;

        if(pages[pages.length -1].page === currentPage) {
            const randomPage = getRandomPage()
            setCurrentPage(() => randomPage)
            fetchNextPhoto({pageParam : randomPage})
        }else{
            const currentPgIndx = getCurrentPhotoPgIndex()
            const nextPage = pages[currentPgIndx + 1]?.page;
            if(!nextPage) return;
            setCurrentPage(() => nextPage)
            fetchNextPhoto({pageParam: nextPage})
        }
    }

    const handlePreviousPhoto = () => {
        const pages = data?.pages
        if(!pages) return;

        const currentPgIdx = getCurrentPhotoPgIndex()
        if(currentPgIdx - 1 < 0) return;

        const prevPage = pages[currentPgIdx - 1]?.page;
        if(!prevPage) return;

        setCurrentPage(() => prevPage)
        fetchPreviousPhoto()
    }

    const getCurrentPhotoPgIndex = () => {
        const pages = data?.pages
        if(!pages) return -1;

        const pgs = pages.map(pg => pg.page)

        return pgs.indexOf(currentPage)
    }

    return {
        currentPhoto,
        handleNextPhoto,
        handlePreviousPhoto,
        hasNextPhoto,
    }

}