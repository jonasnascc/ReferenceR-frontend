/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { usePresentation } from "../../hooks/presentation/usePresentation";
import { useContext, useEffect } from "react";
import { AlbumsCarousel } from "../AlbumsCarousel/AlbumsCarousel";
import { GalleryAlbumHeader } from "./components/GalleryAlbumHeader/GalleryAlbumHeader";
import { AuthorCarouselBlock } from "./components/styles";
import { GalleryAuthorBar } from "./components/GalleryAuthorBar/GalleryAuthorBar";
import { PageContainer } from "../PageContainer/styles";
import { Deviation, SimplePhoto } from "../../../model/photo";
import { usePhotosSelect } from "../../hooks/usePhotosSelect";
import { Album, UserCollection } from "../../../model/album";
import { AuthContext } from "../../../context/AuthContext";

type GalleryBlockProps = {
    albums ?: Album[],
    collections ?: UserCollection[],
    photos : Deviation[],
    selectedAlbum ?: Album | UserCollection,
    handleAlbumClick : (index:number) => void,
    handleLoadMorePhotos : () => void,
    hasNextPage ?: boolean,
    isLoadingPhotos : boolean,
    collectionsPage?:boolean,
    onDeletePhotos ?: (photos : Deviation[] | SimplePhoto[]) => void
}

export const GalleryBlock = ({
    albums,
    collections,
    photos,
    selectedAlbum,
    handleAlbumClick,
    handleLoadMorePhotos,
    hasNextPage,
    isLoadingPhotos,
    collectionsPage,
    onDeletePhotos
} : GalleryBlockProps) => {
    const {authorName} = useParams()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const isCollectionsPage = location.pathname.startsWith("/user/collections")

    const {
        selectedPhotos,
        notSelectedPhotos,
        isSelectingAll,
        selectMode,
        selectRecord,
        handleSelectMode,
        handleSelectPhoto,
        handleSelectAllPhotos,
        handleClearSelection,
        handleChangeCurrentAlbum
    } = usePhotosSelect(photos)

    const {
        currentPhoto, 
        setPresentationPhoto,
        handlePhotosUpdate,
        handlePhotoChange,
        handleNextPhoto,
        handlePreviousPhoto,
        getCurrentPhotoIndex
    } = usePresentation()

    useEffect(() => {
        handlePhotosUpdate(photos)
        console.log({photos})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photos])

    useEffect(() => {
        if(selectedAlbum) handleChangeCurrentAlbum(selectedAlbum)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAlbum])

    const handlePhotoClick = (ph : SimplePhoto, doubleClick?:boolean) => {
        if(!selectMode || doubleClick) setPresentationPhoto(ph)
        else handleSelectPhoto(ph)
    }

    const handleClosePhotoView = () => {
        setPresentationPhoto(null)
        
    }

    const handleDeleteSelected = () => {
        if(onDeletePhotos) {
            onDeletePhotos(selectedPhotos)
            handleSelectMode(false)
        }
    }

    if(!authorName && !isCollectionsPage) {
        navigate("/");
        return (null);
    }
    return (
        <PageContainer>
            <AuthorCarouselBlock>
                {(authorName || collectionsPage)&&<GalleryAuthorBar 
                    author={authorName ? authorName : (collectionsPage ? `${user?.name ? `${user.name}'s Collections`: ""}` : "")} 
                    collectionsPage={collectionsPage} 
                    provider="deviatart"
                />}
                <AlbumsCarousel 
                    albums={albums}
                    collections={collections}
                    selectedAlbum={selectedAlbum}
                    handleAlbumSelect={handleAlbumClick}
                />
            </AuthorCarouselBlock> 

            <GalleryAlbumHeader 
                album={selectedAlbum}
                selectingAll={isSelectingAll&&notSelectedPhotos.length===0}
                selectMode={selectMode}
                onSelectMode={handleSelectMode}
                onSelectAll={handleSelectAllPhotos}
                onClearSelection={handleClearSelection}
                onDeleteSelected={handleDeleteSelected}
                selectedAlbums={Object.values(selectRecord)}
            />

            <PhotosGrid 
                photos={photos} 
                album={selectedAlbum}
                selectMode={selectMode}
                selectedPhotos = {selectedPhotos}
                notSelectedPhotos = {notSelectedPhotos}
                selectingAll={isSelectingAll}
                currentPhoto={currentPhoto}
                onSelectPhoto={handlePhotoClick}
                onSelectAll={handleSelectAllPhotos}
                onLoadMore={handleLoadMorePhotos}
                hasMore={Boolean(hasNextPage)}
                loading={isLoadingPhotos}
                onDeletePhotos={onDeletePhotos}
            />
            {
                currentPhoto!==null&&(
                    <PhotoView
                        initialPhotoIndex={getCurrentPhotoIndex()}
                        open={Boolean(currentPhoto)}
                        onClose={handleClosePhotoView}
                        photos={photos}
                        onPhotoChange={handlePhotoChange}
                        onNextPhoto={handleNextPhoto}
                        onPreviousPhoto={handlePreviousPhoto}
                    />
                )
            }
        </PageContainer>
    )
}