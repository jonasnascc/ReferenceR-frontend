import React from "react";
import { Album } from "../../../model/album";
import {Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { AlbumCarouselImage, AlbumCarouselItemDescription, AlbumCarouselSlideItem, DescriptionAlbumName, DescriptionAlbumSize } from "./styles";
import configuration from "./config";


type AlbumsCarouselProps = {
    albums : Album[],
    selectedAlbum ?: Album,
    handleAlbumSelect: (index: number) => void
}

export const AlbumsCarousel = ({albums, selectedAlbum, handleAlbumSelect} : AlbumsCarouselProps) => {
    return (
        <>
        <Swiper {...configuration}>
            {
                albums.map((alb, index) => (
                    <SwiperSlide key={index}>
                    { ({isActive}) => (

                        <AlbumCarouselSlideItem 
                            selected={selectedAlbum && ((selectedAlbum.code === alb.code) && (selectedAlbum?.author === alb.author))}
                            onClick={() => handleAlbumSelect(index)}
                        >
                            {alb?.thumbnail && (
                                <AlbumCarouselImage
                                    src={alb.thumbnail.url}
                                    alt={`slide-item#${alb.name}`}
                                />
                            )}
                            <AlbumCarouselItemDescription>
                                <DescriptionAlbumName>{(alb.name!=="All") ? (alb.name !== "Scraps" ? alb.name : `${alb.author} - Scraps`) : alb.author}</DescriptionAlbumName>
                                <DescriptionAlbumSize>{`${alb.size} photos`}</DescriptionAlbumSize>
                            </AlbumCarouselItemDescription>
                        </AlbumCarouselSlideItem>

                    )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
        </>
    )
}