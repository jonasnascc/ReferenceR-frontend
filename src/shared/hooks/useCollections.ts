import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { addPhotosToCollection, listCollectionAlbumPhotos, listCollectionAlbums, listCollectionPhotos, listUserCollections } from "../../api/services/Collection";
import { AlbumCollection, CollectionPhotos, UserCollection } from "../../model/collection";
import { useContext, useEffect, useState } from "react";
import { Album } from "../../model/album";
import { AuthContext } from "../../context/AuthContext";
import { Deviation, SimplePhoto } from "../../model/photo";

// albums : Album[],
// photos : Deviation[],
// selectedAlbum ?: Album,
// handleAlbumClick : (index:number) => void,
// handleLoadMorePhotos : () => void,
// hasNextPage ?: boolean,
// isLoadingPhotos : boolean,
// userCollections ?: boolean

export interface Page {
    data: Deviation[];
    page?: number;
}

export const useCollections = () => {
    const {user} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [photos, setPhotos] = useState<Deviation[]>([])
    const [albums, setAlbums] = useState<Album[]>([])

    const [currentCollection, setCurrentCollection] = useState<Album>()

    const [selCollectionAlbums , setSelCollectionAlbums] = useState<Album[]>([])

    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotos}) => addPhotosToCollection(collectionId, photos))

    const [currentLoadingAlbumIndex, setCurrentLoadingAlbumIndex] = useState<number>()
    const [loadedAlbums, setLoadedAlbums] = useState<number[]>([])

    const [isLoadingPhotos] = useState(false)

    const {data:userCollections} = useQuery<UserCollection[]>(["user-collections"], () => listUserCollections(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
                if(!user) return;
    
                data.map(collection => {
                    const albumCode = `${user.id}-collection-${collection.id}`
                    console.log(albumCode)
                    const album : Album = {
                        id: collection.id,
                        code: albumCode,
                        name: collection.name,
                        url: "",
                        thumbnail: {
                            id: -1,
                            code: "",
                            title: "",
                            url: "",
                            mature: true,
                        },
                        author: `${user.name}'s collection`,
                        provider: "referencer",
                        size: 0
                    }
        
                    if(albums.filter(alb => alb.code === album.code).length === 0){
                        setAlbums([...albums, album])
                    }
                })
    
            }
        }
    )

    useQuery<Album[]>([`${currentCollection?.id??-1}-collection-albums`], () => listCollectionAlbums(currentCollection?.id??-1), {
        enabled: Boolean(currentCollection),
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if(data.length>0) {
                setSelCollectionAlbums(data);
                setCurrentLoadingAlbumIndex(0)
            }
        }
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<Page>({
        enabled: Boolean(currentCollection) && (loadedAlbums.length !== selCollectionAlbums.length),
        queryKey: [`${currentCollection?.id??-1}-collection-albums-${currentLoadingAlbumIndex&&`${selCollectionAlbums[currentLoadingAlbumIndex]?.id??-1}`}`],
        refetchOnWindowFocus: false,
        queryFn: async ({pageParam = currentLoadingAlbumIndex}) => {
            console.log({currentCollection, currentLoadingAlbumIndex, selCollectionAlbums})
            if(!currentCollection || currentLoadingAlbumIndex===undefined) return {data:[], page:pageParam};
            const curAlbum = selCollectionAlbums[currentLoadingAlbumIndex]
            if(!curAlbum) return {data:[], page:pageParam};

            const resp = await listCollectionAlbumPhotos(currentCollection.id, curAlbum.id)

            setLoadedAlbums(prev => [...prev, curAlbum.id])
            return {data:resp, page: pageParam}
        },
        getNextPageParam: (lastPage:Page, pages: Page[]) => {
            if(!currentCollection || currentLoadingAlbumIndex === undefined || lastPage.page===undefined) return;
            const curAlbum = selCollectionAlbums[currentLoadingAlbumIndex]
            if(!curAlbum) return;

            if(lastPage.page < albums.length-1){
                return lastPage.page + 1
            }
        },
        getPreviousPageParam: () => {
            return null;
        }
        
    })

    useEffect(() => {
        if(data) {
            if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
                fetchNextPage()
            }
            let array : Deviation[] = []

            data.pages.forEach(page => {
                array = [...array, ...page.data.filter(ph => photos.filter(dv => dv.code === ph.code).length === 0)]
            })
            
            setPhotos(prev => [...prev, ...array])
        }
    }, [data])

    useEffect(() => {
        console.log({loadedAlbums})
    }, [loadedAlbums])
    
    const handleAddPhotos = async (photos:CollectionPhotos, collectionId : number) => {
        await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    const handleAlbumClick = (index:number) => {
        setCurrentCollection(albums[index])
    }

    const handleLoadMorePhotos = () => {
        
    }


    return {
        albums,
        photos,
        userCollections,
        handleAddPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        isLoadingPhotos
    }
}