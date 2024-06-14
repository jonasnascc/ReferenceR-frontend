import InfiniteScroll from "react-infinite-scroll-component";
import { RequireAuth } from "../../../../context/RequireAuth";
import { Deviation } from "../../../../model/photo";
import { SelectedPhotosActions } from "../selectedPhotosActions/SelectedPhotosActions";

type PhotosGridProps = {
    photos: Deviation[],
    selectedPhotos: string[],
    onSelectPhoto : (photoCode : string) => void,
    hasMore:boolean,
    onLoadMore:() => void,
    onAddToCollection: () => void,
    onSelectAll: () => void,
    loading ?: boolean,
    selectingAll ?: boolean,
}

export const PhotosGrid = ({photos, selectedPhotos, hasMore,onLoadMore, onSelectPhoto, onAddToCollection, onSelectAll, loading, selectingAll} : PhotosGridProps) => {
    if(photos.length === 0) return null
    else if(loading) return (<p>loading...</p>)
    return(
        <InfiniteScroll
            dataLength={photos.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
        >
            <RequireAuth>
                <SelectedPhotosActions 
                    selected={selectedPhotos}
                    onAddToCollection={onAddToCollection}
                    onSelectAll={onSelectAll}
                    selectingAll={selectingAll}
                />
            </RequireAuth>
            <div
                style={{
                    display:"flex",
                    flexWrap:"wrap",
                    gap:"10px",
            }}>{
                photos.map((photo, index) => (
                    <img 
                        key={index} 
                        src={photo.thumbUrl} 
                        alt={photo.title}
                        style={{
                            height:"250px",
                            width: "auto",
                            objectFit: "cover",
                            border: (!selectingAll&&selectedPhotos.includes(photo.code)) || (selectingAll&&!selectedPhotos.includes(photo.code)) ? "solid 3px red" : "none",
                            cursor: "pointer"
                        }}
                        onClick={() => onSelectPhoto(photo.code)}
                    />
                ))
            }</div>
        </InfiniteScroll>
    )
}