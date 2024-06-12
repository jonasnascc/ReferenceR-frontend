import { Deviation } from "../../../../model/photo";
import { SelectedPhotosActions } from "../selectedPhotosActions/SelectedPhotosActions";

type PhotosGridProps = {
    photos: Deviation[],
    selectedPhotos: string[],
    selectMode ?: boolean,
    onSelectPhoto : (photoCode : string) => void,
    onAddToCollection: () => void,
    onSelectAll: () => void,
    loading ?: boolean,
    selectingAll ?: boolean,
}

export const PhotosGrid = ({photos, selectedPhotos, selectMode=false, onSelectPhoto, onAddToCollection, onSelectAll, loading, selectingAll} : PhotosGridProps) => {
    if(photos.length === 0) return null
    else if(loading) return (<p>loading...</p>)
    return(
        <div>
            <SelectedPhotosActions 
                selected={selectedPhotos}
                onAddToCollection={onAddToCollection}
                onSelectAll={onSelectAll}
                selectingAll={selectingAll}
            />
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
        </div>
    )
}