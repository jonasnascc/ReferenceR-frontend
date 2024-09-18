import { Album } from "../../../../model/album"
import { OutlinedButton } from "../../Buttons/styles"
import { RequireAuth } from "../../../../context/RequireAuth"

type FavoriteAlbumButtonProps = {
    album : Album,
    visible?:boolean
}

export const FavoriteAlbumButton = ({album, visible= true} : FavoriteAlbumButtonProps) => {

    if(!visible) return null;
    return (
        <RequireAuth>
            <OutlinedButton color="#FCFF55">
            </OutlinedButton>
        </RequireAuth>
    )
}