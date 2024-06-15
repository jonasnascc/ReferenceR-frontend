import { Typography } from "@mui/material";
import { Album } from "../../../../model/album";
import { AlbumTile, HeaderBlock, HeaderContainer } from "./styles";



export const GalleryAlbumHeader = ({album} : {album?:Album}) => {


    if(!album) return (null)
    return(
        <HeaderBlock>
            <HeaderContainer>
                <AlbumTile>
                    <Typography variant="h6" fontWeight={600}>{`${album.name}`}</Typography>
                    <Typography variant="subtitle2">{`${album.size} photos`}</Typography>
                </AlbumTile>
            </HeaderContainer>
        </HeaderBlock>
        
    )
}