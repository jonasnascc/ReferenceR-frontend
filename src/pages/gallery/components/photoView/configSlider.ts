import { SwiperProps } from "swiper/react";
import {Navigation, Zoom} from "swiper/modules"

const SliderConfiguration : SwiperProps = {
    slidesPerView:1,
    navigation:true,
    zoom:true,
    modules:[
        Navigation,
        Zoom
    ],
} 

export default SliderConfiguration