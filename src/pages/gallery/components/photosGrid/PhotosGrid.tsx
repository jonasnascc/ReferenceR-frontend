import InfiniteScroll from "react-infinite-scroll-component";
import { RequireAuth } from "../../../../context/RequireAuth";
import { Deviation } from "../../../../model/photo";
import { SelectedPhotosActions } from "../selectedPhotosActions/SelectedPhotosActions";
import { ImageList, ImageListItem } from "@mui/material";
import { PhotosGridContainer } from "./styles";

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
        <PhotosGridContainer>
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
            <ImageList
                sx={{
                    height:"auto",
                    width:"100%",
                    gridTemplateColumns:
                    "repeat(auto-fill, minmax(200px, 2fr))!important",
                    // gridAutoRows:"10%"
                }}
                cols={6}
                >{
                photos.map((photo, index) => (
                    <ImageListItem 
                        key={index} 
                        sx={{
                            width: "100%",
                            maxHeight:"250px"
                        }}
                    >
                        <img 
                            src={photo.thumbUrl} 
                            alt={photo.title}
                            style={{
                                maxHeight:"100%",
                                maxWidth: "100%",
                                objectFit: "cover",
                                border: (!selectingAll&&selectedPhotos.includes(photo.code)) || (selectingAll&&!selectedPhotos.includes(photo.code)) ? "solid 3px red" : "none",
                                cursor: "pointer"
                            }}
                            onClick={() => onSelectPhoto(photo.code)}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))
            }</ImageList>
        </InfiniteScroll>
        </PhotosGridContainer>
        
    )
}