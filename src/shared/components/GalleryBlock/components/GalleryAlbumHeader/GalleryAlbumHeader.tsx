import { Album } from "../../../../../model/album";
import { HeaderBlock, HeaderContainer, AlbumTile, AlbumSize, AlbumTitle, Sphere } from "./styles";



export const GalleryAlbumHeader = ({album} : {album?:Album}) => {


    if(!album) return (null)
    return(
        <HeaderBlock>
            <HeaderContainer>
                <AlbumTile>
                    <AlbumTitle>{`${album.name}`}</AlbumTitle>
                    <Sphere size="5px"/>
                    <AlbumSize>{`${album.size} photos`}</AlbumSize>
                </AlbumTile>
            </HeaderContainer>
        </HeaderBlock>
        
    )
}