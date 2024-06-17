import { Backdrop, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { Deviation } from "../../../../model/photo";
import { ImageContainer, PhotoViewImage, SwiperContainer } from "./styles";
import SliderConfiguration from "./configSlider";
import { Swiper, SwiperSlide } from "swiper/react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
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

export const PhotoView = ({open=false, initialPhotoIndex=0,photos, onClose, onPhotoChange, onNextPhoto, onPreviousPhoto} : PhotoViewProps) => {
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //   setLoading(true)
    // }, [photo])

    const handleNextPhoto = () => {
      if(onNextPhoto) onNextPhoto()
    }

    const handlePreviousPhoto = () => {
      if(onPreviousPhoto) onPreviousPhoto()
    }

    const handleLoad = () => {
      setLoading(false)
    }

    const handleChange = (index:number) => {
      if(onPhotoChange){
        console.log(onPhotoChange(index))
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
          <button onClick={onClose} style={{
            position:"absolute",
            top:0,
            right:0,
            zIndex:10
          }}>close</button>
          <SwiperContainer>
            <Swiper 
              initialSlide={initialPhotoIndex}
              {...SliderConfiguration}
              style={{
                height:"100%",
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignContent:"center"
              }}
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
                          onLoad={handleLoad}
                        />
                      </ImageContainer>
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          </SwiperContainer>
        </Backdrop>
        </>
    )
}