import { Manipulation, Navigation, Scrollbar, Zoom } from "swiper/modules"
import { SwiperProps } from "swiper/react"

const PhotosSlideConfiguration : SwiperProps = {
    slidesPerView:1,
    navigation:false,
    initialSlide:0,
    zoom:true,
    modules:[
        Navigation,
        Scrollbar,
        Manipulation,
        Zoom
    ],
} 

export default PhotosSlideConfiguration