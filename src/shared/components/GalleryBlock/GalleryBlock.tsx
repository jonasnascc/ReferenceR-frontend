/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { useGallery } from "../../hooks/useGallery";
import { RequireAuth } from "../../../context/RequireAuth";
import { usePresentation } from "../../hooks/presentation/usePresentation";
import { useEffect } from "react";
import { AlbumsCarousel } from "../AlbumsCarousel/AlbumsCarousel";



type GalleryBlockProps = {
    userFavs ?: boolean
}

export const GalleryBlock = ({userFavs} : GalleryBlockProps) => {
    const {authorName} = useParams()
    const navigate = useNavigate();
    const location = useLocation()
    
    const {
        albums,
        photos,
        selectedAlbum,
        selectMode,
        selectedPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        handleSelectMode,
        handleAddToCollection,
        handleSelectAllPhotos,
        isSelectingAll,
        isLoadingAlbums,
        hasNextPage
    } = useGallery({
        authorName: authorName, 
        userFavourites: userFavs,
        provider:"deviantart"
    })

    const {
        currentPhoto, 
        setPresentationPhoto,
        setPhotos : setPstnPhotos,
        photos:pstnPhotos,
        handleNextPhoto,
        handlePreviousPhoto
    } = usePresentation()

    useEffect(() => {
        if(photos.length > 0) {
            const prPhotos = photos.map(ph => {return {
                photo: ph,
                albumCode:selectedAlbum?.code??"",
                albumAuthor:selectedAlbum?.author??"",
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

    if(!authorName && !userFavs) {
        navigate("/");
        return (null);
    }
    return (
        <div>
            {
                authorName&&(<h1>{authorName}'s gallery</h1>)
            }
            <AlbumsCarousel 
                albums={albums}
                selectedAlbum={selectedAlbum}
                handleAlbumSelect={handleAlbumClick}
            />
            <hr/>
            <button onClick={() => navigate(location.pathname + "/presentation", {state:{albums:[selectedAlbum]}, replace:true})}>Start presentation</button>
            
            <PhotosGrid 
                photos={photos} 
                selectedPhotos = {selectedPhotos}
                selectingAll={isSelectingAll}
                onAddToCollection={handleAddToCollection}
                onSelectPhoto={handlePhotoClick}
                onSelectAll={handleSelectAllPhotos}
                onLoadMore={handleLoadMorePhotos}
                hasMore={Boolean(hasNextPage)}
            />
            {
                currentPhoto!==null&&(
                    <PhotoView
                        open={true}
                        onClose={handleClosePhotoView}
                        currentPhoto={currentPhoto}
                        onNextPhoto={handleNextPhoto}
                        onPreviousPhoto={handlePreviousPhoto}
                    />
                )
            }

            {hasNextPage&&<button onClick={handleLoadMorePhotos}>Load more</button>}
        </div>
    )
}