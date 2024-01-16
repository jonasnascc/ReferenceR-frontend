import { Backdrop } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import React, { useState } from 'react';

export const ExpandedImage = ({url, title, open, handleClose} : {url : string, title:string, open:boolean, handleClose:() => any}) => {
    return(
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <img src={url} alt={title} height={"90%"}/>
        </Backdrop>
    )
}