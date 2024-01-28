
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type ThumbnailContainerProps = {
    url : string,
    title : string,
    selectMode ?: boolean,
    onSelect ?: () => any,
    selected ?: boolean
}

export const ThumbnailContainer = ({ url, title, selectMode=false, onSelect = () => {}, selected = false} : ThumbnailContainerProps) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(false);

    useEffect(() => {
        setSelectedPhoto(selected);
    }, [selected])

    useEffect(()=>{
        if(!selectMode) setSelectedPhoto(false);
    }, [selectMode])

    const handleSelect = () => {
        setSelectedPhoto(!selectedPhoto);
        onSelect();
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
                    {selectedPhoto ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankOutlinedIcon/>)}
                </SelectionBox>
            )}
            <ThumbContainer $selected={selectedPhoto} onClick={() => handleSelect()}>
                <ThumbImage
                    src={`${url}`} 
                    alt={title} 
                    loading='lazy' 
                    srcSet={`${url}`}
                    onClick={handleOpen}
                />
            </ThumbContainer>
            {
                // selectMode ? (null) : (
                //     <ExpandedImage url={url} title={title} open={open} handleClose={handleClose}/>
                // )
            }
        </CentralizedDiv>

    )
}

const CentralizedDiv = styled.div`
    display:flex;
    align-items:center;
    height:250px;
    cursor: pointer;
`

const ThumbContainer = styled.div<{$selected ?: boolean}>`
    position: relative;
    display:flex;
    align-items : center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    background-color: white;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border: ${props => props.$selected ? "solid 3px #4f5157" : "none"};
`
const ThumbImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit : scale-down;
`

const SelectionBox = styled.div`
    position: absolute;
    top : 10px;
    right: 10px;
    z-index: 99;
    color : #0070ff;
`