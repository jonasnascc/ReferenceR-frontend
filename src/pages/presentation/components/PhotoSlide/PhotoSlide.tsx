import React from "react";
import { SimplePhoto } from "../../../../model/photo";
import {Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./styles.css"

type PhotoSlideProps = {
    currentPhoto : SimplePhoto,
    onLoadPhoto ?: () => void
}

export const PhotoSlide = ({currentPhoto, onLoadPhoto = () => {} } : PhotoSlideProps) => {

    return (
        <div style={{
            display:"flex",
            width: "100%",
            height: "100%"
        }}>
            <Swiper>
                <SwiperSlide key={`${currentPhoto.code}-${currentPhoto.title}`}>
                    <img
                        src={currentPhoto.url}
                        alt={currentPhoto?.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "90vh"
                        }}
                        onLoad={onLoadPhoto}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}