import { QueryFunctionContext, useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addPhotosToCollection, deleteCollectionPhotos, listCollectionAlbumPhotos, listCollectionAlbums, listCollectionPhotos, listUserCollections } from "../../api/services/Collection";
import { useContext, useEffect, useState } from "react";
import { Album, CollectionPhotosSelection, UserCollection } from "../../model/album";
import { AuthContext } from "../../context/AuthContext";
import { Deviation, SimplePhoto } from "../../model/photo";
import { CollectionPhotosPage } from "../../model/collection";


export const useCollections = () => {
    const {user} = useContext(AuthContext)
    const [photos, setPhotos] = useState<Deviation[]>([])
    const [collections, setCollections] = useState<UserCollection[]>([])

    const [currentCollection, setCurrentCollection] = useState<UserCollection>()

    const [currentPage, setCurrentPage] = useState(1)

    const [isLoadingPhotos, setLoadingPhotos] = useState(false)
    
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotosSelection[]}) => addPhotosToCollection(collectionId, photos))

    const deleteMutation = useMutation(["delete-photo"], (args: {collectionId:number, photoIds:number[]}) => deleteCollectionPhotos(args.collectionId, args.photoIds))

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

    const handleUpdatePhotos = (newValue : Deviation[]) => {
        setPhotos(newValue)
    } 

    const {
            data,
            fetchNextPage,
            hasNextPage
        } = useInfiniteQuery<CollectionPhotosPage>({
            enabled: Boolean(currentCollection),
            queryKey: [`collection-${currentCollection}-photos-${currentPage}`],
            refetchOnWindowFocus: false,
            queryFn: async ({pageParam = currentPage} : QueryFunctionContext) => listCollectionPhotos(currentCollection?.id??-1, pageParam, 5),
            getNextPageParam: (lastPage:CollectionPhotosPage) => lastPage.hasMore ? lastPage.page + 1 : null
    })

    useEffect(() => {
        let photosArray : Deviation[] = []
        data?.pages.forEach(pg => photosArray = [...photosArray, ...pg.photos])
        setPhotos(photosArray)
    }, [data])

    useEffect(() => {
        if(!currentCollection && (collections.length > 0)) {
            handleAlbumClick(0);
        }
    }, [currentCollection, collections])
    
    const handleAddPhotos = async (photos:CollectionPhotosSelection[], collectionId : number) => {
        return await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    const handleAlbumClick = (index:number) => {
        if(currentCollection && (collections[index].id !== currentCollection.id)) {
            setPhotos([])
        }
        setCurrentCollection(collections[index])
    }

    const handleLoadMorePhotos = () => {
        fetchNextPage()
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
        hasNextPage,
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