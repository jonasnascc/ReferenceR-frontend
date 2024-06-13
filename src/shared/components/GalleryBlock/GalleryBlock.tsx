/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { useGallery } from "../../hooks/useGallery";
import { RequireAuth } from "../../../context/RequireAuth";

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
        handleClosePhotoView,
        isSelectingAll,
        isLoadingAlbums,
        hasNextPage
    } = useGallery({
        authorName: authorName, 
        userFavourites: userFavs,
        provider:"deviantart"
    })

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
                onSelectPhoto={handleSelectPhoto}
                onSelectAll={handleSelectAllPhotos}
            />
            {
                showingPhoto!==null&&(
                    <PhotoView
                        open={true}
                        onClose={handleClosePhotoView}
                        photo={showingPhoto}
                    />
                )
            }

            {hasNextPage&&<button onClick={handleLoadMorePhotos}>Load more</button>}
        </div>
    )
}