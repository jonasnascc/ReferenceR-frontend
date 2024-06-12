import { useParams, useNavigate } from "react-router-dom";
import { PhotoView } from "../../../pages/gallery/components/photoView/PhotoView";
import { PhotosGrid } from "../../../pages/gallery/components/photosGrid/PhotosGrid";
import { useGallery } from "../../hooks/useGallery";

type GalleryBlockProps = {
    userFavs ?: boolean
}

export const GalleryBlock = ({userFavs} : GalleryBlockProps) => {
    const {authorName} = useParams()
    const navigate = useNavigate();
    
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
            <button onClick={() => navigate("/")}>Back to search</button>
            {
                authorName&&(<h1>{authorName}'s gallery</h1>)
            }
            {
                isLoadingAlbums ? (
                    <p>Loading...</p>
                ) : (
                    <ol>
                        {albums&&albums.map((album, index) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <li key={index}><a href="#" onClick={() => handleAlbumClick(index)}>
                                    {`${album.name}${userFavs ? " - " + album.author : ""}`}
                                </a>
                            </li>
                        ))}
                    </ol>
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
                        {photos.length > 0 && <button onClick={() => handleSelectMode()}>{`${selectMode ? "Clear selection" : "Select"}`}</button>}
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