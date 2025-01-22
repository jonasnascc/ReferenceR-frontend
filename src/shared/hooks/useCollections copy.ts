import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addPhotosToCollection, deleteCollectionPhotos, listCollectionAlbumPhotos, listCollectionAlbums, listUserCollections } from "../../api/services/Collection";
import { useContext, useEffect, useState } from "react";
import { Album, CollectionPhotosSelection, UserCollection } from "../../model/album";
import { AuthContext } from "../../context/AuthContext";
import { Deviation, SimplePhoto } from "../../model/photo";

export interface Page {
    data: Deviation[];
    page?: number;
}

export const useCollections = () => {
    const {user} = useContext(AuthContext)
    const [photos, setPhotos] = useState<Deviation[]>([])
    const [collections, setCollections] = useState<UserCollection[]>([])

    const [currentCollection, setCurrentCollection] = useState<UserCollection>()

    const [selCollectionAlbums , setSelCollectionAlbums] = useState<Album[]>([])

    const [currentLoadingAlbumIndex, setCurrentLoadingAlbumIndex] = useState<number>()
    const [loadedAlbums, setLoadedAlbums] = useState<number[]>([])

    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotosSelection[]}) => addPhotosToCollection(collectionId, photos))

    const deleteMutation = useMutation(["delete-photo"], (args: {collectionId:number, photoIds:number[]}) => deleteCollectionPhotos(args.collectionId, args.photoIds))

    //List collections
    const {data:userCollections} = useQuery<UserCollection[]>(["user-collections"], () => listUserCollections(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
                if(!user) return;
    
                data.forEach(col => {
                    if(collections.filter(collection => col.id === collection.id).length === 0){
                        setCollections(prev => [...prev, col])
                    }
                })
    
            }
        }
    )

    //List albums that collection includes
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

    useEffect(() => {
        console.log(Boolean(currentCollection),{currentCollection, selCollectionAlbums, loadedAlbums, photos, currentLoadingAlbumIndex})
    }, [currentCollection, selCollectionAlbums, loadedAlbums, photos, currentLoadingAlbumIndex])

    const checkIfAnyAlbumIsntLoaded = () => {
        return Boolean(currentCollection) // Any collection is selected
            && (selCollectionAlbums.length > 0) // Any album is linked to selected collection
            && (loadedAlbums.length !== selCollectionAlbums.length) // Any album is waiting to load
    }

    const getCollectionQueryKey = () => {
        console.log({currentLoadingAlbumIndex, selCollectionAlbums})
        console.log(`collection-albums-${currentLoadingAlbumIndex&&`${selCollectionAlbums[currentLoadingAlbumIndex]?.id??-1}`}`)
        return `collection-albums-${currentLoadingAlbumIndex&&`${selCollectionAlbums[currentLoadingAlbumIndex]?.id??-1}`}`
    }
    //
    const {
        fetchNextPage,
    } = useInfiniteQuery<Page>({
        enabled: checkIfAnyAlbumIsntLoaded(),
        queryKey: [getCollectionQueryKey()],
        refetchOnWindowFocus: false,
        queryFn: async ({pageParam = currentLoadingAlbumIndex}) => {
            console.log({currentCollection, currentLoadingAlbumIndex, sel: selCollectionAlbums[currentLoadingAlbumIndex??-1]??null})

            if(!currentCollection || currentLoadingAlbumIndex===undefined) return {data:[], page:pageParam};

            const curAlbum = selCollectionAlbums[currentLoadingAlbumIndex]
            if(!curAlbum) return {data:[], page:pageParam};

            setLoadingPhotos(true)

            const resp : Deviation[] = await listCollectionAlbumPhotos(currentCollection.id, curAlbum.id)
            setPhotos(prev => [...prev, ...resp])

            setLoadedAlbums(prev => [...prev, curAlbum.id])
            
            setLoadingPhotos(false)
            if(resp) {
                if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                    setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
                    fetchNextPage()
                }
                let array = resp.filter(ph => photos.filter(dv => dv.code === ph.code).length === 0)
                
                const photosArray= [...photos, ...array]
                console.log(photosArray)
            }

            return {data:resp, page: pageParam}
        },
        getNextPageParam: (lastPage:Page) => {
            if(!currentCollection || currentLoadingAlbumIndex === undefined || lastPage.page===undefined) return;
            const curAlbum = selCollectionAlbums[currentLoadingAlbumIndex]
            if(!curAlbum) return;

            if(lastPage.page < collections.length-1){
                return lastPage.page + 1
            }
        },
        getPreviousPageParam: () => {
            return null;
        }
        
    })

    useEffect(() => {
        if(!currentCollection && (collections.length > 0)) {
            handleAlbumClick(0);
        }
    }, [currentCollection, collections])
    
    const handleAddPhotos = async (photos:CollectionPhotosSelection[], collectionId : number) => {
        return await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    const handleAlbumClick = (index:number) => {
        console.log({album: index})
        if(currentCollection && (collections[index].id !== currentCollection.id)) {
            setLoadedAlbums([])
            setPhotos([])
            setCurrentLoadingAlbumIndex(0)
        }
        setCurrentCollection(collections[index])
        console.log({collection: collections[index]})
    }

    const handleLoadMorePhotos = () => {
        if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
                fetchNextPage()
            }
    }

    const handleDeletePhotos = (delPhotos:Deviation[]|SimplePhoto[]) => {
        const ids = delPhotos.map(ph => ph.id)
        const array = photos.filter(ph => !ids.includes(ph.id))
        if(currentCollection) {
            deleteMutation.mutateAsync({collectionId: currentCollection.id, photoIds: delPhotos.map(ph => ph.id)})
            .then(resp => {
                if(resp.status === 200) setPhotos(array)
            })
            .catch(error => console.log(error))
        }
    }


    return {
        currentCollection,
        collections,
        photos,
        userCollections,
        handleAddPhotos,
        handleAlbumClick,
        handleDeletePhotos,
        handleLoadMorePhotos,
        isLoadingPhotos
    }
}