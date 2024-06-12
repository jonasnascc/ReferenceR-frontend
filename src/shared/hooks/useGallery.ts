import { useInfiniteQuery, useMutation, useQuery } from "react-query"
import { favoriteAlbum, fetchAuthorAlbums, fetchFavoritedAlbums } from "../../api/services/Album"
import { Album, FavouriteAlbum } from "../../model/album"
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
    const [searchParams, setSearchParams] = useSearchParams()

    const [isLoadingAlbums, setLoadingAlbums] = useState(false)
    const [albums, setAlbums] = useState<Album[]>([])

    const [selectMode, setSelectMode] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState<Album>()

    const [isSelectingAll, setSelectingAll] = useState(false)
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

    const [showingPhoto, setShowingPhoto] = useState<Deviation|null>(null)

    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    const [photos, setPhotos] = useState<Deviation[]>([])

    const [currentPage, setCurrentPage] = useState(1)

    const {isLoading:loadingAlbums, isFetching:fetchingAlbums} = useQuery<Album[]>(["albums"], 
        () => fetchAuthorAlbums(config?.authorName??"", config.provider), 
        {
            enabled: Boolean(config?.authorName) && !Boolean(config.userFavourites),
            refetchOnWindowFocus: false,
            retry: 3,
            onSuccess: (data) => {
                handleSetAlbums(data)
            }
        })

    const {isLoading:loadingFavAlbums, isFetching:fetchingFavAlbums} = useQuery<Album[]>(["albums-fav"], 
        () => fetchFavoritedAlbums(), 
        {
            enabled: Boolean(config?.userFavourites),
            refetchOnWindowFocus: false,
            retry: 3,
            onSuccess: (data) => {
                handleSetAlbums(data)
            }
        })

    const favouriteMutation = useMutation([`album-${selectedAlbum?.code}-favourite`], (favAlbum:FavouriteAlbum) => favoriteAlbum(favAlbum))

    const {
        data:photosPages,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<Page>({
        enabled: Boolean(selectedAlbum)&&(Boolean(config?.authorName)||Boolean(config?.userFavourites)),
        queryKey: [`album-${selectedAlbum?.code??""}-photos`],
        queryFn: async ({ pageParam = currentPage }) => {
            if(!selectedAlbum) return {data:[], page:pageParam}
            setLoadingPhotos(true)
            const resp = await fetchAlbumPhotos(
                selectedAlbum,
                config?.authorName ? config.authorName : selectedAlbum.author,
                config.provider,
                pageParam,
                30
            )
            setLoadingPhotos(false)
            return {data:resp, page:pageParam}
        },
        getNextPageParam: (lastPage:Page, pages: Page[]) => {
            if (!selectedAlbum || !lastPage.page) {
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
                    finalData = [...finalData, photo]
                })
            })
            return finalData
        }

        if(photosPages&&photosPages.pages.length > 0) {
            setPhotos(extractPagesData())
        }
        
    }, [photosPages])

    // useEffect(()=> {
    //     console.log(isSelectingAll, selectedPhotos)
    // },[isSelectingAll, selectedPhotos])

    const handleSetAlbums = (data:Album[]) => {
        setAlbums(data)
        const paramAlb = searchParams.get("album")
        if(paramAlb) {
            const alb = findAlbumByCode(paramAlb, data)
            if(alb) setSelectedAlbum(alb)
            else setSelectedAlbum(data[0])
        }
        else setSelectedAlbum(data[0])
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

    const  findAlbumByCode = (code : string, albumsArray:Album[]) => {
        const result = albumsArray.filter(alb => alb.code.trim() === code.trim())
        if(result.length>0) {
            return result[0]
        }
    }

    const handleSelectMode = (state ?: boolean) => {
        const newState = state ? state : !selectMode;
        if(!newState) {
            setSelectedPhotos([])
            setSelectingAll(false)
        }
        setSelectMode(newState)
    }

    const handleSelectPhoto = (photoCode : string) => {
        if(selectMode) changePhotoSelected(photoCode, !selectedPhotos.includes(photoCode))
        else {
            handleViewPhoto(photoCode)
        }
    }

    const changePhotoSelected = (photoCode:string, selected:boolean) => {
        if(selected) selectPhoto(photoCode)
        else unselectPhoto(photoCode)
    }

    const selectPhoto = (photoCode:string) => {
        setSelectedPhotos((prev) => [...prev, photoCode])
    }

    const unselectPhoto = (photoCode:string) => {
        const filtered = selectedPhotos.filter(ph => ph !== photoCode);
        setSelectedPhotos(filtered)
    }

    const handleAddToCollection = () => {
        if(!selectedAlbum) return;
        if(isSelectingAll){
            if(selectedPhotos.length===0) 
                favouriteMutation.mutate({album:selectedAlbum, except:null})
            
            else
                favouriteMutation.mutate({album:selectedAlbum, except:selectedPhotos})
            
        }
        else{
            //favourite selected
        }


        handleClearSelection()

        //add service 
    }

    const handleClearSelection = () => {
        setSelectedPhotos([])
        setSelectingAll(false)
    }


    const handleSelectAllPhotos = () => {
        if(isSelectingAll){
            setSelectedPhotos([])
        }
        setSelectMode(true)
        setSelectingAll(true)
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
        isSelectingAll,
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