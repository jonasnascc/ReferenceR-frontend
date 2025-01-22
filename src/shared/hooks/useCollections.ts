import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addPhotosToCollection, deleteCollectionPhotos, listCollectionAlbumPhotos, listCollectionAlbums, listCollectionPhotos, listUserCollections } from "../../api/services/Collection";
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
    // const [photos, setPhotos] = useState<Deviation[]>([])
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
        
    const {data:photos} = useQuery([`collection-${currentCollection?.id}-photos`], () => listCollectionPhotos(currentCollection?.id ?? -1), {
        enabled: Boolean(currentCollection?.id),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })  

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
            // setPhotos([])
            setCurrentLoadingAlbumIndex(0)
        }
        setCurrentCollection(collections[index])
        console.log({collection: collections[index]})
    }

    const handleLoadMorePhotos = () => {
        if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
            }
    }

    const handleDeletePhotos = (delPhotos:Deviation[]|SimplePhoto[]) => {
        // const ids = delPhotos.map(ph => ph.id)
        // const array = photos.filter(ph => !ids.includes(ph.id))
        // if(currentCollection) {
        //     deleteMutation.mutateAsync({collectionId: currentCollection.id, photoIds: delPhotos.map(ph => ph.id)})
        //     .then(resp => {
                // if(resp.status === 200) setPhotos(array)
        //     })
        //     .catch(error => console.log(error))
        // }
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