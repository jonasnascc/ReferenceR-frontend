import { Backdrop, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { SimplePhoto } from "../../../../model/photo";
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
    photo : SimplePhoto,
    onClose : () => void
}

export const PhotoView = ({open=false, photo, onClose} : PhotoViewProps) => {

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
            <img
              src={photo.url}
              alt={photo.title}
              
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%"
              }}
            />
            <button onClick={onClose} style={{
              position:"absolute",
              top:0,
              right:0
            }}>close</button>
          </ContentArea>
        </Backdrop>
        </>
    )
}