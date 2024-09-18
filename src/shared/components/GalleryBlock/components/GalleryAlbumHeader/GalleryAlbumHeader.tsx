import { useLocation, useNavigate } from "react-router-dom";
import { Album, CollectionPhotosSelection, UserCollection } from "../../../../../model/album";
import { OutlinedButton } from "../../../Buttons/styles";
import { HeaderBlock, HeaderContainer, AlbumTile, AlbumSize, AlbumTitle, Sphere } from "./styles";
import { GallerySelectButtons } from "../GallerySelectButtons/GallerySelectButtons";
import { FavoriteAlbumButton } from "../../../FavoriteAlbum/FavoriteAlbumButton/FavoriteAlbumButton";
import { CollectionsListModalProps } from "../../../CollectionsModal/types";


type GalleryAlbumHeaderProps = {
    album?:Album | UserCollection,
    selectedAlbums:CollectionPhotosSelection[]
    selectingAll:boolean,
    selectMode ?: boolean,
    onSelectMode ?: () => void,
    onClearSelection ?: () => void,
    onSelectAll ?: () => void
    onDeleteSelected ?: () => void
}

export const GalleryAlbumHeader = ({
    album, 
    selectingAll,
    selectMode=false, 
    onSelectMode = () => {},
    onSelectAll,
    onClearSelection,
    selectedAlbums,
    ...props
} : GalleryAlbumHeaderProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const isCollectionPage = location.pathname.startsWith("/user/collections")
    
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
                    
                    <FavoriteAlbumButton album={album as Album} visible={!isCollectionPage}/>

                    <Sphere size="5px"/>

                    <OutlinedButton color="white" onClick={handleStartPresentation}>Chrono Shuffle</OutlinedButton>

                    <Sphere size="5px"/>

                    <GallerySelectButtons 
                        active={selectMode}
                        selectingAll={selectingAll}
                        selectingAny={selectedAlbums.length > 0}
                        onSelect={handleSelectMode}
                        onSelectAll={onSelectAll}
                        onClearSelection={onClearSelection}
                        album={album}
                        selectedAlbums={selectedAlbums}
                        {...props}
                    />
                </AlbumTile>
            </HeaderContainer>
        </HeaderBlock>
        
    )
}