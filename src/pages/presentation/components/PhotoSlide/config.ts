import { Navigation, Scrollbar } from "swiper/modules"
import { SwiperProps } from "swiper/react"

const PhotosSlideConfiguration : SwiperProps = {
    slidesPerView:1,
    navigation:false,
    slideToClickedSlide:true,
    initialSlide:0,
    scrollbar:{
        hide: false,
    },
    modules:[
        Navigation,
        Scrollbar
    ],
} 

export default PhotosSlideConfiguration