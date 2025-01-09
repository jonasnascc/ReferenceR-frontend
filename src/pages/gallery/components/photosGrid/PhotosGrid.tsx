import InfiniteScroll from "react-infinite-scroll-component";
import { Deviation, SimplePhoto } from "../../../../model/photo";
import { CustomCircularProgress, CustomImageList, CustomImageListItem, LoadingImageBlock, PhotosGridContainer, PhotosGridImage } from "./styles";
import { SelectBox } from "./components/SelectBox";
import { useEffect, useState } from "react";
import { GalleryGrid } from "./components/GalleryGrid/GalleryGrid";
import { Album, UserCollection } from "../../../../model/album";

type PhotosGridProps = {
    photos: Deviation[],
    album?:Album | UserCollection,
    selectMode : boolean,
    selectedPhotos: SimplePhoto[],
    notSelectedPhotos: SimplePhoto[],
    currentPhoto : Deviation|null,
    onSelectPhoto : (ph : SimplePhoto, doubleClick?:boolean) => void,
    hasMore:boolean,
    onLoadMore:() => void,
    onSelectAll: () => void,
    loading ?: boolean,
    selectingAll ?: boolean,
    onDeletePhotos ?: (photo : Deviation[]) => void
}

export const PhotosGrid = ({photos, album, currentPhoto, selectMode, selectedPhotos, notSelectedPhotos, hasMore,onLoadMore, onDeletePhotos, onSelectPhoto, onSelectAll, loading, selectingAll} : PhotosGridProps) => {
    if(photos.length === 0) {
        return null
    }
    const handleSelectPhoto = (ph : Deviation, doubleClick?:boolean) => {
        onSelectPhoto({...ph, author:ph.author.name}, doubleClick)
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

    const checkIsPresenting  = (code:string) => {
        if(!currentPhoto) return false;

        return currentPhoto.code === code
    }

    return(
        <PhotosGridContainer>
        <InfiniteScroll
            dataLength={photos.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<></>}
            endMessage={<></>}
            style={{overflow:"hidden"}}
        >
            <GalleryGrid 
                photos={photos} 
                album={album}
                cols={6}
                onClick={(photo:Deviation) => handleSelectPhoto(photo, false)}
                onDoubleClick={(photo:Deviation) => handleSelectPhoto(photo, true)}
                checkPhotoSelectedFn={(photo:Deviation) => checkSelected(photo.code)}
                checkPhotoIsPresenting={(photo:Deviation)=> checkIsPresenting(photo.code)}
                onDeletePhotos={onDeletePhotos}
            />
        </InfiniteScroll>
        </PhotosGridContainer>
        
    )
}