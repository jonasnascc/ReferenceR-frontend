import React from "react";
import { Album } from "../../../model/album";
import {Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


type AlbumsCarouselProps = {
    albums : Album[],
    selectedAlbum ?: Album,
    handleAlbumSelect: (index: number) => void
}

export const AlbumsCarousel = ({albums, selectedAlbum, handleAlbumSelect} : AlbumsCarouselProps) => {
    return (
        <>
        <Swiper 
            spaceBetween={"10vw"} 
            slidesPerView={1}
            navigation
            slideToClickedSlide
            initialSlide={0}
            breakpoints={{
                500 : {
                    slidesPerView: 2.5
                },
                980: {
                    slidesPerView: 3.5
                },
                1200:{
                    slidesPerView: 4.5
                },
                1700: {
                    slidesPerView: 6.5
                }
            }}
            pagination={{
                clickable:true
            }}
            modules={[
                Navigation,
                Pagination,
            ]}
        >
            {
                albums.map((alb, index) => (
                    <SwiperSlide key={index} onClick={() => handleAlbumSelect(index)}>
                    { ({isActive}) => (
                        <div style={{
                            height:"300px",
                            width: "auto",
                            border: selectedAlbum && (
                                ((selectedAlbum.code === alb.code) && (selectedAlbum?.author === alb.author)) ? 
                                "solid 2px red" : "solid 1px gray"
                            )
                        }}>
                            {alb?.thumbnail && (
                                <img
                                    src={alb.thumbnail.url}
                                    alt="slide-item"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                />
                            )}
                        </div>
                    )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </>
    )
}