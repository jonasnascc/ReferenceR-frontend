import { Manipulation, Navigation, Scrollbar } from "swiper/modules"
import { SwiperProps } from "swiper/react"

const PhotosSlideConfiguration : SwiperProps = {
    slidesPerView:1,
    navigation:false,
    initialSlide:0,
    modules:[
        Navigation,
        Scrollbar,
        Manipulation
    ],
} 

export default PhotosSlideConfiguration