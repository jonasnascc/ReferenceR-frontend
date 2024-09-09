/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { useGallery } from "../../hooks/useGallery";
import { usePresentation } from "../../hooks/presentation/usePresentation";
import { useEffect } from "react";
import { AlbumsCarousel } from "../AlbumsCarousel/AlbumsCarousel";
import { GalleryAlbumHeader } from "./components/GalleryAlbumHeader/GalleryAlbumHeader";
import { AuthorCarouselBlock } from "./components/styles";
import { GalleryAuthorBar } from "./components/GalleryAuthorBar/GalleryAuthorBar";
import { PageContainer } from "../PageContainer/styles";
import { CollectionPhoto } from "../../../model/collection";
import { SimplePhoto } from "../../../model/photo";
import { usePhotosSelect } from "../../hooks/usePhotosSelect";

type GalleryBlockProps = {
    userCollections ?: boolean
}

export const GalleryBlock = ({userCollections} : GalleryBlockProps) => {
    const {authorName} = useParams()
    const navigate = useNavigate();
    
    const {
        albums,
        photos,
        selectedAlbum,
        handleAlbumClick,
        handleLoadMorePhotos,
        hasNextPage,
        isLoadingPhotos,
        
    } = useGallery({
        authorName: authorName, 
        userFavourites: userCollections,
        provider:"deviantart"
    })

    const {
        selectedPhotos,
        notSelectedPhotos,
        isSelectingAll,
        selectMode,
        handleSelectMode,
        handleSelectPhoto,
        handleSelectAllPhotos,
        handleClearSelection,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photos])

    const handlePhotoClick = (ph : SimplePhoto, doubleClick?:boolean) => {
        if(!selectMode || doubleClick) setPresentationPhoto(ph)
        else handleSelectPhoto({code:ph.code, page:ph.page??-1})
    }

    const handleClosePhotoView = () => {
        setPresentationPhoto(null)
        
    }

    if(!authorName && !userCollections) {
        navigate("/");
        return (null);
    }
    return (
        <PageContainer>
            <AuthorCarouselBlock>
                {(authorName||userCollections)&&<GalleryAuthorBar 
                    author={userCollections&&selectedAlbum?.author!==undefined ? selectedAlbum.author : (authorName ? authorName : "")} 
                    userCollections 
                    provider="deviatart"
                />}
                <AlbumsCarousel 
                    albums={albums}
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
                selectedPhotos={selectedPhotos}
                exceptPhotos={notSelectedPhotos}
            />

            <PhotosGrid 
                photos={photos} 
                selectMode={selectMode}
                selectedPhotos = {selectedPhotos}
                notSelectedPhotos = {notSelectedPhotos}
                selectingAll={isSelectingAll}
                onSelectPhoto={handlePhotoClick}
                onSelectAll={handleSelectAllPhotos}
                onLoadMore={handleLoadMorePhotos}
                hasMore={Boolean(hasNextPage)}
                loading={isLoadingPhotos}
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