import { useNavigate, useParams } from "react-router-dom"
import { useGallery } from "../../shared/hooks/useGallery";
import { PhotosGrid } from "./components/photosGrid/PhotosGrid";
import { PhotoView } from "./components/photoView/PhotoView";

export const GalleryPage = () => {
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
        isLoadingPhotos,
        isLoadingAlbums,
        hasNextPage
    } = useGallery(authorName??"", "deviantart")

    if(!authorName) {
        navigate("/");
        return (null);
    }
    else return (
        <div>
            <h1>{authorName}'s gallery</h1>
            {
                isLoadingAlbums ? (
                    <p>Loading...</p>
                ) : (
                    <ol>
                        {albums&&albums.map((album, index) => (
                            <li key={index}><a href="#" onClick={() => handleAlbumClick(index)}>{album.name}</a></li>
                        ))}
                    </ol>
                )
            }
            <hr/>
            {
                albums&&albums.filter(alb => alb.code === selectedAlbum?.code??"").map((alb,index) => (
                    <div key={index}>
                        <img src={alb.thumbnail.url} alt={alb.thumbnail.title} style={{width: "auto", height: "200px"}}/>
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
                onAddToCollection={handleAddToCollection}
                onSelectPhoto={handleSelectPhoto}
                onSelectAll={handleSelectAllPhotos}
                loading={isLoadingPhotos}
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