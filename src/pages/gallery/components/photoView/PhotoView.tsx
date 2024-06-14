import { Backdrop, CircularProgress, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { Deviation, SimplePhoto } from "../../../../model/photo";
import { ContentArea } from "./styles";

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
    currentPhoto: Deviation,
    onClose : () => void,
    onNextPhoto?:() => void,
    onPreviousPhoto?:() => void
}

export const PhotoView = ({open=false, currentPhoto, onClose, onNextPhoto, onPreviousPhoto} : PhotoViewProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
    }, [currentPhoto])

    const handleNextPhoto = () => {
      if(onNextPhoto) onNextPhoto()
    }

    const handlePreviousPhoto = () => {
      if(onPreviousPhoto) onPreviousPhoto()
    }

    const handleLoad = () => {
      setLoading(false)
    }

    return(
        <>
        <Backdrop
            sx={{ 
              color: '#fff', 
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={open}
            component={"div"}
            TransitionComponent={Transition}
        >
          <ContentArea onClick={(event)=>{event.stopPropagation()}}>
            {loading&&<CircularProgress sx={{color:"white"}}/>}
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              onLoad={handleLoad}
              
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                display: loading ? "none" : ""
              }}
            />
            
            <button onClick={onClose} style={{
              position:"absolute",
              top:0,
              right:0
            }}>close</button>
            <div style={{
              position:"absolute",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              bottom:"50px"
            }}>
              <button>save to collection</button>
              <button onClick={handlePreviousPhoto}>previous</button>
              <button onClick={handleNextPhoto}>next</button>
            </div>
          </ContentArea>
        </Backdrop>
        </>
    )
}