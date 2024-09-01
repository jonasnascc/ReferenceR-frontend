import { useNavigate } from "react-router-dom";
import { Album } from "../../../../../model/album";
import { OutlinedButton } from "../../../Buttons/styles";
import { HeaderBlock, HeaderContainer, AlbumTile, AlbumSize, AlbumTitle, Sphere } from "./styles";



export const GalleryAlbumHeader = ({album} : {album?:Album}) => {
    const navigate = useNavigate()
    
    const handleStartPresentation = () => {
        if(album) navigate(`/chronoShuffle`, {state: {albums: [album]}})
    }

    if(!album) return (null)
    return(
        <HeaderBlock>
            <HeaderContainer>
                <AlbumTile>
                    <AlbumTitle>{`${album.name}`}</AlbumTitle>
                    <Sphere size="5px"/>
                    <AlbumSize>{`${album.size} photos`}</AlbumSize>
                    <OutlinedButton color="white" onClick={handleStartPresentation}>Start Presentation</OutlinedButton>
                </AlbumTile>
            </HeaderContainer>
        </HeaderBlock>
        
    )
}