import InfiniteScroll from "react-infinite-scroll-component";
import { Deviation, SimplePhoto } from "../../../../model/photo";
import { CustomCircularProgress, CustomImageList, CustomImageListItem, LoadingImageBlock, PhotosGridContainer, PhotosGridImage } from "./styles";
import { SelectBox } from "./components/SelectBox";
import { CollectionPhoto } from "../../../../model/collection";

type PhotosGridProps = {
    photos: Deviation[],
    selectMode : boolean,
    selectedPhotos: CollectionPhoto[],
    notSelectedPhotos: CollectionPhoto[],
    onSelectPhoto : (ph : SimplePhoto, doubleClick?:boolean) => void,
    hasMore:boolean,
    onLoadMore:() => void,
    onSelectAll: () => void,
    loading ?: boolean,
    selectingAll ?: boolean,
}

export const PhotosGrid = ({photos, selectMode, selectedPhotos, notSelectedPhotos, hasMore,onLoadMore, onSelectPhoto, onSelectAll, loading, selectingAll} : PhotosGridProps) => {
    if(photos.length === 0) return null

    const handleSelectPhoto = (ph : Deviation, doubleClick?:boolean) => {
        onSelectPhoto(ph, doubleClick)
    }

    const checkSelected = (code : string) => {
        if(!selectingAll){
            const selPhoto = selectedPhotos.filter(ph => ph.code === code)
            if(selPhoto.length === 0) return false;
            return true;
        }
        else {
            const selPhoto = notSelectedPhotos.filter(ph => ph.code === code)
            if(selPhoto.length === 0) return true;
            return false
        }
    }

    return(
        <PhotosGridContainer>
        <InfiniteScroll
            dataLength={photos.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<></>}
            endMessage={<></>}
        >
            <CustomImageList
                gap={8}
                cols={6}
            >{
                photos.map((photo, index) => (
                    <CustomImageListItem 
                        key={index} 
                    >
                        {selectMode&&<SelectBox 
                            checked={checkSelected(photo.code)} 
                            onCheck={() => handleSelectPhoto(photo)}
                        />}
                        <PhotosGridImage
                            selected={checkSelected(photo.code)} 
                            src={photo.thumbUrl} 
                            alt={photo.title}
                            onClick={() => handleSelectPhoto(photo)}
                            onDoubleClick={() => handleSelectPhoto(photo, true)}
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