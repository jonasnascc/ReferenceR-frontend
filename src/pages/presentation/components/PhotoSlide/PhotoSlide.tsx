import React, { useEffect, useState } from "react";
import {Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css"

import configuration from "./config"
import { PresentationPhoto } from "../../../../shared/hooks/presentation/usePresentation";

type PhotoSlideProps = {
    currentIndex: number,
    photos : PresentationPhoto[],
    onLoadPhoto ?: () => void,
    onIndexChange : (index:number) => void
}

export const PhotoSlide = ({photos, currentIndex,onLoadPhoto = () => {}, onIndexChange} : PhotoSlideProps) => {
    const [index, setIndex] = useState(currentIndex)
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [touching, setTouching] = useState(false)

    useEffect(() => {
        if(swiperRef) {
            if(currentIndex < photos.length){
                if(!touching) {
                    setIndex(() => currentIndex)
                }
            }
        }
        console.log({currentIndex, len: photos.length})
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, swiperRef, photos])

    useEffect(() => {
        if(swiperRef) 
            swiperRef.slideTo(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])


    const handleSlideChange = () => {
        console.log({change:"change", touching})
        if(touching&&swiperRef) {
            onIndexChange(swiperRef.activeIndex)
            console.log(touching? "touched" : "not touched")
        }
    }

    const handleTouch = (state:boolean) => {
        setTouching(state)
    }

    return (
        <div style={{
            display:"flex",
            width: "100%",
            height: "100%"
        }}>
            <Swiper 
                onSwiper={setSwiperRef}
                onSlideChangeTransitionStart={handleSlideChange}
                onTouchStart={() => handleTouch(true)}
                onTouchEnd={() => handleTouch(false)}
                onTouchCancel={() => handleTouch(false)}
                {...configuration}
            >
                {photos.map((ph) => {
                    if(ph.photo) return (
                        <SwiperSlide key={`${ph.photo.code}-${ph.photo.title}`}>
                            <img
                                src={ph.photo.url}
                                alt={ph.photo?.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "90vh"
                                }}
                                onLoad={onLoadPhoto}
                            />
                        </SwiperSlide>
                    )
                    return null
                })}
            </Swiper>
        </div>
    )
};