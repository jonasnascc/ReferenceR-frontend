import { useInfiniteQuery, useQuery } from "react-query"
import { fetchAuthorAlbums } from "../../api/services/Album"
import { Album } from "../../model/album"
import { useEffect, useState } from "react"
import { Deviation } from "../../model/photo"
import { fetchAlbumPhotos } from "../../api/services/Photo"

interface Page {
    data: Deviation[];
    page?: number;
  }

export const useGallery = (authorName:string, provider: string) => {

    const [isLoadingAlbums, setLoadingAlbums] = useState(false)
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectMode, setSelectMode] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState<Album>()

    
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

    const [showingPhoto, setShowingPhoto] = useState<Deviation|null>(null)


    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    const [photos, setPhotos] = useState<Deviation[]>([])

    const [currentPage, setCurrentPage] = useState(1)


    const {isLoading:loadingAlbums, isFetching:fetchingAlbums} = useQuery<Album[]>(["albums"], () => fetchAuthorAlbums(authorName, provider), {
        refetchOnWindowFocus: false,
        retry: 3,
        onSuccess: (data) => {
            setAlbums(data)
            setSelectedAlbum(data[0])
        }
    })

    useEffect(() => {
        if(loadingAlbums || fetchingAlbums) {
            setLoadingAlbums(true)
        }
        else if(!loadingAlbums && !fetchingAlbums)
            setLoadingAlbums(false)
    }, [loadingAlbums, fetchingAlbums])



    const {
        data:photosPages,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<Page>({
        queryKey: [`album-${selectedAlbum?.code??""}-photos[${currentPage}]`],
        queryFn: async ({ pageParam = currentPage }) => {
            if(!selectedAlbum) return {data:[], page:pageParam}
            setLoadingPhotos(true)
            const resp = await fetchAlbumPhotos(
                selectedAlbum,
                authorName,
                provider,
                pageParam,
                30
            )
            setLoadingPhotos(false)
            return {data:resp, page:pageParam}
        },
        getNextPageParam: (lastPage:Page) => {
            if (!selectedAlbum || !lastPage.page) {
                console.log(selectedAlbum, lastPage); 
                return;
            }
            const size = selectedAlbum.size;
            const pagesCount = Math.ceil(size / 30);
            if(lastPage.page < pagesCount) {
                return (lastPage.page + 1);
            }
        },
        getPreviousPageParam: () => {
            return null;
        }
    });

    useEffect(() => {
        const extractPagesData = () : Deviation[] => {
            let finalData : Deviation[]= []
            photosPages?.pages.forEach(page => {
                page.data.forEach(photo => {
                    finalData = [...finalData, photo]
                })
            })
            return finalData
        }

        if(photosPages&&photosPages.pages.length > 0) {
            setPhotos(extractPagesData)
        }
        
    }, [photosPages])

    const handleAlbumClick = (index : number) => {
        setSelectedAlbum(() => {
            setCurrentPage(() => 1)
            return albums[index]
        })
    }

    const getAlbumByIndex = (index:number) => {
        if(albums) return albums[index]
        else return null;
    }

    const handleSelectMode = (state ?: boolean) => {
        const newState = state ? state : !selectMode;
        if(!newState) {
            setSelectedPhotos([])
        }
        setSelectMode(newState)
    }

    const handleSelectPhoto = (photoCode : string) => {
        if(selectMode) {
            if(!selectedPhotos.includes(photoCode))
                setSelectedPhotos((prev) => [...prev, photoCode])
            else {
                const filtered = selectedPhotos.filter(ph => ph !== photoCode);
                setSelectedPhotos(filtered)
            }
        } else {
            handleViewPhoto(photoCode)
        }
    }

    const handleAddToCollection = () => {
        const toAdd = selectedPhotos
        handleClearSelection()

        //add service 
    }

    const handleClearSelection = () => {
        setSelectedPhotos([])
    }


    const handleSelectAllPhotos = () => {
        setSelectMode(true)
        const mapped = photos.map(ph => ph.code);
        setSelectedPhotos(mapped)
    }

    const handleViewPhoto = (photoCode : string) => {
        const photo = photos.filter(ph => ph.code === photoCode)
        if(photo.length===0) return;
        setShowingPhoto(photo[0])
    }

    const handleClosePhotoView = () => {
        setShowingPhoto(null)
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
        showingPhoto,
        isLoadingPhotos,
        selectMode,
        currentPage,
        selectedPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        handleSelectMode,
        handleSelectPhoto,
        handleViewPhoto,
        handleSelectAllPhotos,
        handleAddToCollection,
        handleClosePhotoView,
        getAlbumByIndex,
        hasNextPage,
    }
}