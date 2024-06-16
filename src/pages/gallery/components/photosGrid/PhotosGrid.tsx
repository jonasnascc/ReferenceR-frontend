import InfiniteScroll from "react-infinite-scroll-component";
import { Deviation } from "../../../../model/photo";
import { CustomCircularProgress, CustomImageList, CustomImageListItem, LoadingImageBlock, PhotosGridContainer, PhotosGridImage } from "./styles";

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
    return(
        <PhotosGridContainer>
        <InfiniteScroll
            dataLength={photos.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<></>}
            
            endMessage={<></>}
        >
            {/* <RequireAuth>
                <SelectedPhotosActions 
                    selected={selectedPhotos}
                    onAddToCollection={onAddToCollection}
                    onSelectAll={onSelectAll}
                    selectingAll={selectingAll}
                />
            </RequireAuth> */}
            <CustomImageList
                gap={8}
                cols={6}
            >{
                photos.map((photo, index) => (
                    <CustomImageListItem 
                        key={index} 
                    >
                        <PhotosGridImage
                            selected={(!selectingAll&&selectedPhotos.includes(photo.code)) || (selectingAll&&!selectedPhotos.includes(photo.code))} 
                            src={photo.thumbUrl} 
                            alt={photo.title}
                            onClick={() => onSelectPhoto(photo.code)}
                            loading="lazy"
                        />
                    </CustomImageListItem>
                ))
            }
            {loading&&(
                <CustomImageListItem>
                    <LoadingImageBlock>
                        <CustomCircularProgress/>
                    </LoadingImageBlock>
                </CustomImageListItem>
            )}
            
            
            </CustomImageList>
        </InfiniteScroll>
        </PhotosGridContainer>
        
    )
}