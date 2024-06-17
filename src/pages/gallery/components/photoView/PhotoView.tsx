import { Backdrop, Fade } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { Deviation } from "../../../../model/photo";
import { CloseButton, ImageContainer, PhotoDescription, PhotoViewImage, Slider, SliderContainer } from "./styles";
import SliderConfiguration from "./configSlider";
import { SwiperSlide } from "swiper/react";
import CloseIcon from '@mui/icons-material/Close';

import "swiper/css"
import "swiper/css/navigation"
import 'swiper/css/zoom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Fade {...props} ref={ref}/>
});
  
type PhotoViewProps = {
    open ?: boolean,
    initialPhotoIndex?:number,
    photos:Deviation[],
    onClose : () => void,
    onPhotoChange ?: (index:number) => Deviation|null,
    onNextPhoto?:() => void,
    onPreviousPhoto?:() => void
}

export const PhotoView = ({open=false, initialPhotoIndex=0,photos, onClose, onPhotoChange} : PhotoViewProps) => {
  const [displayPhoto, setDisplayPhoto] = useState<Deviation|null>()
  const handleChange = (index:number) => {
    if(onPhotoChange){
      setDisplayPhoto(onPhotoChange(index))
    }
  }

  return(
      <>
      <Backdrop
          sx={{ 
            color: 'box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;', 
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={open}
          onBlur={onClose}
          component={"div"}
          TransitionComponent={Transition}
      >
        <CloseButton onClick={onClose}><CloseIcon style={{height:"100%", width:"100%"}}/></CloseButton>
        <PhotoDescription>{displayPhoto?.title??""}</PhotoDescription>
        <SliderContainer>
          <Slider 
            initialSlide={initialPhotoIndex}
            {...SliderConfiguration}
            onRealIndexChange={(swiper:any) => {handleChange(swiper.realIndex)}}
          >
              {
                photos.map(photo => (
                  <SwiperSlide key={photo.code}>
                    <ImageContainer>
                      <PhotoViewImage 
                        src={photo.url} 
                        alt={photo.title} 
                        loading="lazy"
                      />
                    </ImageContainer>
                  </SwiperSlide>
                ))
              }
          </Slider>
        </SliderContainer>
      </Backdrop>
      </>
  )
}