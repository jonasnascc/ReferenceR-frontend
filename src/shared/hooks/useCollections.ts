import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { addPhotosToCollection, listCollectionAlbumPhotos, listCollectionAlbums, listUserCollections } from "../../api/services/Collection";
import { CollectionPhotos, UserCollection } from "../../model/collection";
import { useContext, useEffect, useState } from "react";
import { Album } from "../../model/album";
import { AuthContext } from "../../context/AuthContext";
import { Deviation } from "../../model/photo";

export interface Page {
    data: Deviation[];
    page?: number;
}

export const useCollections = () => {
    const {user} = useContext(AuthContext)
    const [photos, setPhotos] = useState<Deviation[]>([])
    const [albums, setAlbums] = useState<Album[]>([])

    const [currentCollection, setCurrentCollection] = useState<Album>()

    const [selCollectionAlbums , setSelCollectionAlbums] = useState<Album[]>([])

    const [currentLoadingAlbumIndex, setCurrentLoadingAlbumIndex] = useState<number>()
    const [loadedAlbums, setLoadedAlbums] = useState<number[]>([])

    const [isLoadingPhotos] = useState(false)
    
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotos}) => addPhotosToCollection(collectionId, photos))


    const {data:userCollections} = useQuery<UserCollection[]>(["user-collections"], () => listUserCollections(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
                if(!user) return;
    
                data.forEach(collection => {
                    const albumCode = `collection-${collection.id}:${user.id}`
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
                        author: `${user.name}`,
                        provider: "referencer",
                        size: 0
                    }
        
                    if(albums.filter(alb => alb.code === album.code).length === 0){
                        setAlbums(prev => [...prev, album])
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
        fetchNextPage,
    } = useInfiniteQuery<Page>({
        enabled: Boolean(currentCollection) && (loadedAlbums.length !== selCollectionAlbums.length),
        queryKey: [`${currentCollection?.id??-1}-collection-albums-${currentLoadingAlbumIndex&&`${selCollectionAlbums[currentLoadingAlbumIndex]?.id??-1}`}`],
        refetchOnWindowFocus: false,
        queryFn: async ({pageParam = currentLoadingAlbumIndex}) => {
            if(!currentCollection || currentLoadingAlbumIndex===undefined) return {data:[], page:pageParam};
            const curAlbum = selCollectionAlbums[currentLoadingAlbumIndex]
            if(!curAlbum) return {data:[], page:pageParam};

            const resp : Deviation[] = await listCollectionAlbumPhotos(currentCollection.id, curAlbum.id)

            setLoadedAlbums(prev => [...prev, curAlbum.id])

            if(resp) {
                if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                    setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
                    fetchNextPage()
                }
                let array = resp.filter(ph => photos.filter(dv => dv.code === ph.code).length === 0)
                
                const photosArray= [...photos, ...array]
                setPhotos(photosArray)
            }

            return {data:resp, page: pageParam}
        },
        getNextPageParam: (lastPage:Page) => {
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
    
    const handleAddPhotos = async (photos:CollectionPhotos, collectionId : number) => {
        await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    const handleAlbumClick = (index:number) => {
        if(currentCollection && (albums[index].code !== currentCollection.code)) {
            setLoadedAlbums([])
            setPhotos([])
            setCurrentLoadingAlbumIndex(0)
        }
        setCurrentCollection(albums[index])
    }

    const handleLoadMorePhotos = () => {
        if((loadedAlbums.length !== selCollectionAlbums.length && currentLoadingAlbumIndex!==undefined)) {
                setCurrentLoadingAlbumIndex(() => currentLoadingAlbumIndex + 1)
                fetchNextPage()
            }
    }


    return {
        currentCollection,
        albums,
        photos,
        userCollections,
        handleAddPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        isLoadingPhotos
    }
}