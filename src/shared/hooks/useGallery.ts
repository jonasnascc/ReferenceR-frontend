import { useInfiniteQuery, useQuery } from "react-query"
import { fetchAuthorAlbums, fetchFavoritedAlbums } from "../../api/services/Album"
import { Album } from "../../model/album"
import { useEffect, useState } from "react"
import { Deviation } from "../../model/photo"
import { fetchAlbumPhotos } from "../../api/services/Photo"
import { useSearchParams } from "react-router-dom"

export interface Page {
    data: Deviation[];
    page?: number;
}

export const useGallery = (config : {
    authorName?: string,
    provider : string,
    userFavourites ?: boolean
}) => {
    const {
        authorName,
        provider,
        userFavourites,
    } = config

    const [searchParams, setSearchParams] = useSearchParams()

    const [isLoadingAlbums, setLoadingAlbums] = useState(false)
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectedAlbum, setSelectedAlbum] = useState<Album>()

    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    const [photos, setPhotos] = useState<Deviation[]>([])

    const [currentPage, setCurrentPage] = useState(1)

    const {isLoading:loadingAlbums, isFetching:fetchingAlbums} = useQuery<Album[]>([`albums-${config.authorName}`], 
        () => fetchAuthorAlbums(authorName??"", provider), 
        {
            enabled: Boolean(authorName) && !Boolean(userFavourites),
            refetchOnWindowFocus: false,
            retry: 3,
            onSuccess: (data) => handleSetAlbums(data)
            
        })

    const {isLoading:loadingFavAlbums, isFetching:fetchingFavAlbums} = useQuery<Album[]>([`albums-fav`], 
        () => fetchFavoritedAlbums(), 
        {
            enabled: Boolean(config?.userFavourites),
            refetchOnWindowFocus: false,
            retry: 3,
            onSuccess: (data) =>  handleSetAlbums(data)
            
        })

    const {
        data:photosPages,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<Page>({
        enabled: Boolean(selectedAlbum)&&(Boolean(authorName)||Boolean(config?.userFavourites)),
        queryKey: [`album-${selectedAlbum?.code??""}-${selectedAlbum?.author??""}-photos`],
        refetchOnWindowFocus: false,
        retry: 3,
        queryFn: async ({ pageParam = currentPage }) => {
            if(!selectedAlbum) return {data:[], page:pageParam}
            setLoadingPhotos(true)
            const resp = await fetchAlbumPhotos(
                selectedAlbum,
                authorName ? authorName : selectedAlbum.author,
                provider,
                pageParam,
                50
            )
            setLoadingPhotos(false)
            return {data:resp, page:pageParam}
        },
        getNextPageParam: (lastPage:Page, pages: Page[]) => {
            if (!selectedAlbum || !lastPage.page) {
                return;
            }
            const size = selectedAlbum.size;
            const pagesCount = Math.ceil(size / 50);
            if(lastPage.page < pagesCount) {
                return (lastPage.page + 1);
            }
        },
        getPreviousPageParam: () => {
            return null;
        }
    });

    useEffect(() => {
        if(loadingAlbums || fetchingAlbums || loadingFavAlbums || fetchingFavAlbums) {
            setLoadingAlbums(true)
        }
        else if(!loadingAlbums && !fetchingAlbums && !loadingFavAlbums && !fetchingFavAlbums)
            setLoadingAlbums(false)
    }, [loadingAlbums, fetchingAlbums, loadingFavAlbums, fetchingFavAlbums])

    useEffect(() => {
        const extractPagesData = () : Deviation[] => {
            let finalData : Deviation[]= []
            photosPages?.pages.forEach(page => {
                page.data.forEach(photo => {
                    if(selectedAlbum) photo.albumCode = selectedAlbum.code
                    finalData = [...finalData, photo]
                })
            })
            return finalData.sort(sortPhotosByPublishedTime)
        }

        if(photosPages&&photosPages.pages.length > 0) {
            setPhotos(extractPagesData())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photosPages])

    const handleSetAlbums = (data:Album[]) => {
        setAlbums(data)
        const paramAlb = searchParams.get("album")
        if(paramAlb && authorName) {
            const alb = findAlbumByCode(paramAlb, data)
            if(alb) setSelectedAlbum(alb)
            else setSelectedAlbum(data[0])
            return;
        }

        setSelectedAlbum(data[0])
    }

    const handleAlbumClick = (index : number) => {
        setSelectedAlbum(() => {
            setCurrentPage(() => 1)
            return albums[index]
        })
        setParam("album", albums[index].code)
    }

    const setParam = (prop:string, value:string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(prop, value)
        setSearchParams(newSearchParams);
    }

    const getAlbumByIndex = (index:number) => {
        if(albums) return albums[index]
        else return null;
    }

    const sortPhotosByPublishedTime = (a:Deviation, b:Deviation) => {
        const dateA = new Date(a.publishedTime);
        const dateB = new Date(b.publishedTime);
        return dateB.getTime() - dateA.getTime();
    }

    const  findAlbumByCode = (code : string, albumsArray:Album[]) => {
        const result = albumsArray.filter(alb => alb.code.trim() === code.trim())
        if(result.length>0) {
            return result[0]
        }
    }

    const handleLoadMorePhotos = () => {
        if(hasNextPage) {
            setCurrentPage((current) => current+1)
            fetchNextPage()
        }
    }    
    return {
        albums,
        isLoadingAlbums,
        selectedAlbum,
        photos,
        isLoadingPhotos,
        currentPage,
        handleAlbumClick,
        handleLoadMorePhotos,
        getAlbumByIndex,
        hasNextPage,
    }
}