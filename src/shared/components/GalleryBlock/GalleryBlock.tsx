/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { useGallery } from "../../hooks/useGallery";
import { RequireAuth } from "../../../context/RequireAuth";
import { usePresentation } from "../../hooks/presentation/usePresentation";
import { useEffect } from "react";

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
        showingPhoto,
        selectedAlbum,
        selectMode,
        selectedPhotos,
        handleAlbumClick,
        handleLoadMorePhotos,
        handleSelectMode,
        handleAddToCollection,
        handleSelectPhoto,
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
        photos:pstnPhotos
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
            {
                isLoadingAlbums ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {albums&&albums.map((album, index) => (
                            <li key={index}>
                                <div>
                                    <a href="#" onClick={() => handleAlbumClick(index)}>
                                        {`${album.name}${userFavs ? " - " + album.author : ""}`}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }
            <hr/>
            {
                albums&&albums.filter(alb => (alb.code === selectedAlbum?.code??"")&&(alb.author===selectedAlbum?.author)).map((alb,index) => (
                    <div key={index}>
                        {
                            alb?.thumbnail&&(
                                <img src={alb.thumbnail.url} alt={alb.thumbnail.title} style={{width: "auto", height: "200px"}}/>
                            )
                        }
                        <h2>{alb.name}</h2>
                        <p>{`${alb.size} photos`}</p>
                        <button onClick={() => navigate(location.pathname + "/presentation", {state:{albums:[alb]}, replace:true})}>Start presentation</button>
                        <br/>
                        <RequireAuth>
                            {
                            userFavs&&(
                                <>
                                <button>Delete from collection</button>
                                <br/><br/>
                                </>
                            )
                            }
                            {photos.length > 0 && <button onClick={() => handleSelectMode()}>{`${selectMode ? "Clear selection" : "Select"}`}</button>}
                        </RequireAuth>
                        
                        <hr/>
                    </div>
                ))
            }
            
            <PhotosGrid 
                photos={photos} 
                selectedPhotos = {selectedPhotos}
                selectMode={selectMode}
                selectingAll={isSelectingAll}
                onAddToCollection={handleAddToCollection}
                onSelectPhoto={handlePhotoClick}
                onSelectAll={handleSelectAllPhotos}
            />
            {
                currentPhoto!==null&&(
                    <PhotoView
                        open={true}
                        onClose={handleClosePhotoView}
                        currentPhoto={currentPhoto}
                    />
                )
            }

            {hasNextPage&&<button onClick={handleLoadMorePhotos}>Load more</button>}
        </div>
    )
}