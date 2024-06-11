import { useQuery, useQueryClient } from "react-query"
import { fetchAuthorAlbums } from "../../api/services/Album"
import { Album } from "../../model/album"
import { useEffect, useState } from "react"
import { Deviation } from "../../model/photo"
import { fetchAlbumPhotos } from "../../api/services/Photo"

export const useGallery = (authorName:string, provider: string) => {
    const queryClient = useQueryClient();

    const [isLoadingAlbums, setLoadingAlbums] = useState(false)
    const [albums, setAlbums] = useState<Album[]>()

    const [selectMode, setSelectMode] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState<number>(0)

    
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

    const [showingPhoto, setShowingPhoto] = useState<Deviation|null>(null)


    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    const [photos, setPhotos] = useState<Deviation[]>([])


    const {isLoading:loadingAlbums, isFetching:fetchingAlbums} = useQuery<Album[]>(["albums"], () => fetchAuthorAlbums(authorName, provider), {
        refetchOnWindowFocus: false,
        retry: 3,
        onSuccess: (data) => {
            setAlbums(data)
        }
    })

    useEffect(() => {
        if(loadingAlbums || fetchingAlbums) {
            setLoadingAlbums(true)
        }
        else if(!loadingAlbums && !fetchingAlbums)
            setLoadingAlbums(false)
    }, [loadingAlbums, fetchingAlbums])

    const seePhotosQuery = (album:Album, authorName:string, pg:number) => queryClient.fetchQuery([`album-${album.code}-photos`], 
        async () => {
            try {
                const data = await fetchAlbumPhotos(
                    album,
                    authorName,
                    provider,
                    pg,
                    30
                )
                if (data) setPhotos(data)
                else setPhotos([])
            } catch (err) {
                return setPhotos([])
            }
        })

    const handleAlbumClick = (index : number) => {
        setSelectedAlbum(index)
    }
    
    const handleSeePhotosClick = async (album : Album) => {
        if(!authorName) return;

        setLoadingPhotos(true)
        await seePhotosQuery(album, authorName, 1)
        setLoadingPhotos(false)
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
    
    return {
        albums,
        isLoadingAlbums,
        selectedAlbum,
        photos,
        showingPhoto,
        isLoadingPhotos,
        selectMode,
        selectedPhotos,
        handleAlbumClick,
        handleSeePhotosClick,
        handleSelectMode,
        handleSelectPhoto,
        handleViewPhoto,
        handleSelectAllPhotos,
        handleAddToCollection,
        handleClosePhotoView,
        getAlbumByIndex
    }
}