import { Album } from "../../../model/album";
import {Swiper, SwiperSlide } from "swiper/react";
import { AlbumsCarouselItem } from "./AlbumsCarouselItem";
import { AlbumCarouselBackground } from "./styles";

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import configuration from "./config";



type AlbumsCarouselProps = {
    albums : Album[],
    selectedAlbum ?: Album,
    handleAlbumSelect: (index: number) => void
}

export const AlbumsCarousel = (props : AlbumsCarouselProps) => {
    const {albums, selectedAlbum, handleAlbumSelect} = props;

    return (
        <AlbumCarouselBackground>
        <Swiper {...configuration}>
            {
                albums.map((alb, index) => (
                    <SwiperSlide key={`${alb.author}-${alb.code}`}>
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
        
        </AlbumCarouselBackground>
    )
}