
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExpandedImage } from './ExpandedImage';
import { Box } from '@mui/material';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type ThumbnailContainerProps = {
    url : string,
    title : string,
    selectMode ?: boolean,
    onSelect : () => any
}

export const ThumbnailContainer = ({ url, title, selectMode=false, onSelect} : ThumbnailContainerProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        if(!selectMode) setSelected(false);
    }, [selectMode])

    const handleSelect = () => {
        if(selectMode) {
            setSelected(!selected);
            onSelect();
        } 
    }

    const handleClose = () => {
        setOpen(false);
      };
      
    const handleOpen = () => {
        if(!selectMode) setOpen(true);
    };
    
    return (
        <CentralizedDiv>
            {selectMode && (
                <SelectionBox>
                    {selected ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankOutlinedIcon/>)}
                </SelectionBox>
            )}
            <ThumbContainer onClick={handleSelect}>
                <Box sx={{border : `${!selected ? "none" : "solid 3px #0070ff"}`, borderRadius: "10px"}}>
                    <ThumbImage
                        src={`${url}`} 
                        alt={title} 
                        loading='lazy' 
                        srcSet={`${url}`}
                        onClick={handleOpen}
                    />
                </Box>
            </ThumbContainer>
            {
                selectMode ? (null) : (
                    <ExpandedImage url={url} title={title} open={open} handleClose={handleClose}/>
                )
            }
        </CentralizedDiv>

    )
}

const CentralizedDiv = styled.div`
    display:flex;
    align-items:center;
    height:100%;
`

const ThumbContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    max-height : 800px;
    overflow: hidden;


`


const ThumbImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit : cover;
`

const SelectionBox = styled.div`
    position: absolute;
    top : 10px;
    right: 10px;
    z-index: 99;
    color : #0070ff;
`