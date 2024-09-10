import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPhotosToCollection, listCollectionPhotos, listUserCollections } from "../../api/services/Collection";
import { AlbumCollection, CollectionPhotos, UserCollection } from "../../model/collection";
import { useContext, useState } from "react";
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

export const useCollections = () => {
    const {user} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [photos, setPhotos] = useState<Deviation[]>([])
    const [albums, setAlbums] = useState<Album[]>([])
    const postPhotosMutation = useMutation(["collections-append-photos"], ({collectionId, photos} : {collectionId:number, photos:CollectionPhotos}) => addPhotosToCollection(collectionId, photos))

    const [isLoadingPhotos] = useState(false)

    const {data:userCollections} = useQuery<UserCollection[]>(["user-collections"], () => listUserCollections(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
                if(!user) return;
    
                data.forEach(collection => {
                    const albumCode = `${user.id}-collection-${collection.id}`
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
    
    const handleAddPhotos = async (photos:CollectionPhotos, collectionId : number) => {
        await postPhotosMutation.mutateAsync({collectionId, photos})
    }

    const handleListCollectionPhotos = async (collectionId : number) => {
        await queryClient.fetchQuery([`${collectionId}-collection-photos`], () => listCollectionPhotos(collectionId))
        .then((data : Deviation[]) => {
            let array : Deviation[] = []

            data.forEach(ph => {
                if(array.filter(dv => dv.code === ph.code).length === 0) {
                    array = [...array, ph]
                }
            })

            setPhotos(array)
        });
        
    }

    const handleAlbumClick = (index:number) => {
        handleListCollectionPhotos(albums[index].id)
    }

    const handleLoadMorePhotos = () => {
        
    }


    return {
        albums,
        photos,
        userCollections,
        handleAddPhotos,
        handleListCollectionPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        isLoadingPhotos
    }
}