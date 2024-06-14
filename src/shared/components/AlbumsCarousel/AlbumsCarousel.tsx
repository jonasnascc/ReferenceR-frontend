import { Album } from "../../../model/album";
import {Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import configuration from "./config";
import { AlbumsCarouselItem } from "./AlbumsCarouselItem";


type AlbumsCarouselProps = {
    albums : Album[],
    selectedAlbum ?: Album,
    handleAlbumSelect: (index: number) => void
}

export const AlbumsCarousel = (props : AlbumsCarouselProps) => {
    const {albums, selectedAlbum, handleAlbumSelect} = props;

    return (
        <>
        <Swiper {...configuration}>
            {
                albums.map((alb, index) => (
                    <SwiperSlide key={index}>
                    { ({isActive}) => (
                        <AlbumsCarouselItem
                            selected={selectedAlbum && ((selectedAlbum.code === alb.code) && (selectedAlbum?.author === alb.author))}
                            onSelect={() => handleAlbumSelect(index)}
                            album={alb}
                        />
                    )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
        </>
    )
}