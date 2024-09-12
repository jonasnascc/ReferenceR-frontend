import InfiniteScroll from "react-infinite-scroll-component";
import { Deviation, SimplePhoto } from "../../../../model/photo";
import { CustomCircularProgress, CustomImageList, CustomImageListItem, LoadingImageBlock, PhotosGridContainer, PhotosGridImage } from "./styles";
import { SelectBox } from "./components/SelectBox";
import { useEffect, useState } from "react";
import { GalleryGrid } from "./components/GalleryGrid/GalleryGrid";

type PhotosGridProps = {
    photos: Deviation[],
    selectMode : boolean,
    selectedPhotos: SimplePhoto[],
    notSelectedPhotos: SimplePhoto[],
    onSelectPhoto : (ph : SimplePhoto, doubleClick?:boolean) => void,
    hasMore:boolean,
    onLoadMore:() => void,
    onSelectAll: () => void,
    loading ?: boolean,
    selectingAll ?: boolean,
}

export const PhotosGrid = ({photos, selectMode, selectedPhotos, notSelectedPhotos, hasMore,onLoadMore, onSelectPhoto, onSelectAll, loading, selectingAll} : PhotosGridProps) => {
    if(photos.length === 0) {
        return null
    }

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
            <GalleryGrid 
                photos={photos} 
                cols={6}
                onClick={(photo:Deviation) => handleSelectPhoto(photo, false)}
                onDoubleClick={(photo:Deviation) => handleSelectPhoto(photo, true)}
                checkPhotoSelectedFn={(photo:Deviation) => checkSelected(photo.code)}
            />
        </InfiniteScroll>
        </PhotosGridContainer>
        
    )
}