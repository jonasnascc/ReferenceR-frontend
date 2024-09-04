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
        selectedPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        handleAddToCollection,
        handleSelectAllPhotos,
        isSelectingAll,
        hasNextPage,
        isLoadingPhotos,
    } = useGallery({
        authorName: authorName, 
        userFavourites: userCollections,
        provider:"deviantart"
    })

    const {
        currentPhoto, 
        setPresentationPhoto,
        setPhotos : setPstnPhotos,
        handlePhotoChange,
        handleNextPhoto,
        handlePreviousPhoto,
        getCurrentPhotoIndex
    } = usePresentation()

    useEffect(() => {
        if(photos.length > 0) {
            const prPhotos = photos.map(ph => {return {
                photo: ph,
                album : null,
                page: -1
            }})

            setPstnPhotos(() => prPhotos)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photos])

    const handlePhotoClick = (photoCode : string) => {
        setPresentationPhoto(photoCode)
    }

    const handleClosePhotoView = () => [
        setPresentationPhoto(null)
    ]

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
            <GalleryAlbumHeader album={selectedAlbum}/>
            <PhotosGrid 
                photos={photos} 
                selectedPhotos = {selectedPhotos}
                selectingAll={isSelectingAll}
                onAddToCollection={handleAddToCollection}
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