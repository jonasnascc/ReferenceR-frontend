import { useNavigate } from "react-router-dom";
import { Album } from "../../../../../model/album";
import { OutlinedButton } from "../../../Buttons/styles";
import { HeaderBlock, HeaderContainer, AlbumTile, AlbumSize, AlbumTitle, Sphere } from "./styles";
import { GallerySelectButtons } from "../GallerySelectButtons/GallerySelectButtons";
import { FavoriteAlbumButton } from "../../../FavoriteAlbum/FavoriteAlbumButton/FavoriteAlbumButton";
import { CollectionsListModalProps } from "../../../CollectionsModal/types";
import { CollectionPhoto } from "../../../../../model/collection";


type GalleryAlbumHeaderProps = {
    selectedPhotos : CollectionPhoto[],
    album?:Album,
    exceptPhotos: CollectionPhoto[]
    selectingAll:boolean,
    selectMode ?: boolean,
    onSelectMode ?: () => void,
    onClearSelection ?: () => void,
    onSelectAll ?: () => void
}

export const GalleryAlbumHeader = ({
    album, 
    selectingAll,
    selectMode=false, 
    onSelectMode = () => {},
    onSelectAll,
    onClearSelection,
    ...props
} : GalleryAlbumHeaderProps) => {
    const navigate = useNavigate()
    
    const handleStartPresentation = () => {
        if(album) navigate(`/chronoShuffle`, {state: {albums: [album]}})
    }

    const handleSelectMode = () => {
        onSelectMode()
    }

    if(!album) return (null)
    return(
        <HeaderBlock>
            <HeaderContainer>
                <AlbumTile>
                    <AlbumTitle>{`${album.name}`}</AlbumTitle>
                    
                    <Sphere size="5px"/>
                    
                    <AlbumSize>{`${album.size} photos`}</AlbumSize>
                    
                    <Sphere size="5px"/>

                    <GallerySelectButtons 
                        active={selectMode}
                        selectingAll={selectingAll}
                        onSelect={handleSelectMode}
                        onSelectAll={onSelectAll}
                        onClearSelection={onClearSelection}
                        album={album}
                        {...props}
                    />

                    <Sphere size="5px"/>

                    <FavoriteAlbumButton album={album}/>

                    <OutlinedButton color="white" onClick={handleStartPresentation}>Start Presentation</OutlinedButton>
                </AlbumTile>
            </HeaderContainer>
        </HeaderBlock>
        
    )
}