import { SwiperProps } from "swiper/react";
import {Navigation, Pagination} from "swiper/modules"

const AlbumCarouselConfiguration : SwiperProps = {
    spaceBetween:"10vw", 
    slidesPerView:1,
    navigation:true,
    slideToClickedSlide:true,
    initialSlide:0,
    breakpoints:{
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
    },
    pagination:{
        clickable:true
    },
    modules:[
        Navigation,
        Pagination,
    ]
} 

export default AlbumCarouselConfiguration