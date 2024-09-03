import React, { useEffect, useState } from "react";
import { Deviation} from "../../../../model/photo";
import {Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css"

import configuration from "./config"
import { PresentationPhoto } from "../../../../shared/hooks/presentation/usePresentation";

type PhotoSlideProps = {
    currentIndex: number,
    photos : PresentationPhoto[],
    onLoadPhoto ?: () => void,
    onNextSlide : () => void,
    onPreviousSlide: () => void
}

export const PhotoSlide = ({photos, currentIndex, onNextSlide, onPreviousSlide, onLoadPhoto = () => {}} : PhotoSlideProps) => {
    const [index, setIndex] = useState(currentIndex)
    const [lastIndex, setLastIndex] = useState(currentIndex)
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [touching, setTouching] = useState(false)

    useEffect(() => {
        if(swiperRef) {
            if(currentIndex < photos.length){
                if(!touching) {
                    setLastIndex(() => index)
                    setIndex(() => currentIndex)
                }
            }
            console.log({currentIndex, len: photos.length})
        }
        
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
            if(index !== lastIndex) {
                if(index < lastIndex) onPreviousSlide()
                if(index > lastIndex) onNextSlide()
            }
        }
    }

    const handleTouch = (state:boolean) => {
        console.log(state ? "touching" : "not touching") 
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