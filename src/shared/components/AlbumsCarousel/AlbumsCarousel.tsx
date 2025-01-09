import { Album, UserCollection } from "../../../model/album";
import {Swiper, SwiperSlide } from "swiper/react";
import { AlbumsCarouselItem } from "./AlbumsCarouselItem";
import { AlbumCarouselBackground } from "./styles";

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import configuration from "./config";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";



type AlbumsCarouselProps = {
    albums ?: Album[],
    collections ?: UserCollection[],
    selectedAlbum ?: Album | UserCollection,
    handleAlbumSelect: (index: number) => void
}

export const AlbumsCarousel = (props : AlbumsCarouselProps) => {
    const {user} = useContext(AuthContext)
    const {albums, selectedAlbum, handleAlbumSelect, collections} = props;

    return (
        <AlbumCarouselBackground>
        <Swiper {...configuration}>
            {
                albums&&albums.map((alb, index) => (
                    <SwiperSlide key={`${alb.author}-${alb.code}`}>
                    { ({isActive}) => (
                        <AlbumsCarouselItem
                            selected={selectedAlbum && 'code' in selectedAlbum && ((selectedAlbum.code === alb.code) && (selectedAlbum?.author === alb.author))}
                            onSelect={() => handleAlbumSelect(index)}
                            album={alb}
                        />
                    )}
                    </SwiperSlide>
                ))
            }
            {
                collections&&collections.map((col, index) => (
                    <SwiperSlide key={`${user?.name}-${col.id}`}>
                    { ({isActive}) => (
                        <AlbumsCarouselItem
                            selected={selectedAlbum && !('code' in selectedAlbum) &&((selectedAlbum.id === col.id))}
                            onSelect={() => handleAlbumSelect(index)}
                            album={col}
                            isCollection
                        />
                    )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
        </AlbumCarouselBackground>
    )
}