import { QueryClient, useMutation, useQueryClient } from "react-query"
import { Album } from "../../../../model/album"
import { OutlinedButton } from "../../Buttons/styles"
import { favoriteAlbum, unfavoriteAlbum } from "../../../../api/services/Album"
import { useState } from "react"
import { RequireAuth } from "../../../../context/RequireAuth"

type FavoriteAlbumButtonProps = {
    album : Album,
    visible?:boolean
}

export const FavoriteAlbumButton = ({album, visible= true} : FavoriteAlbumButtonProps) => {

    const queryClient = useQueryClient()
    const [favorited, setFavorited] = useState<boolean>(Boolean(album.favorited))

    const favoriteMutation = useMutation([`favorite-album-${album.code}`], () => favoriteAlbum({album, except:null}), {
        onError: () => setFavorited(false)
    })
    const unFavoriteMutation = useMutation([`unfavorite-album-${album.code}`], () => unfavoriteAlbum(album), {
        onError: () => setFavorited(true)
    })
    

    const handleClick = () => {
        setFavorited(state => !state)

        if(album.favorited === true) unFavoriteMutation.mutate()
        else favoriteMutation.mutate()

        queryClient.refetchQueries(`albums-${album.author}`)
    }

    if(!visible) return null;
    return (
        <RequireAuth>
            <OutlinedButton color="#FCFF55" onClick={handleClick} active={favorited}>
                {favorited ? "Favorite" : "Favorite Album"}
            </OutlinedButton>
        </RequireAuth>
    )
}