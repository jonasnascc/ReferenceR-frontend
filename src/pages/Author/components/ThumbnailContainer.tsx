
import { useState } from 'react';
import styled from 'styled-components';
import { ExpandedImage } from './ExpandedImage';

type ThumbnailContainerProps = {
    url : string,
    title : string
}

export const ThumbnailContainer = ({url, title} : ThumbnailContainerProps) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
      };
      
    const handleOpen = () => {
        setOpen(true);
    };
    
    return (
        <CentralizedDiv>
            <ThumbContainer>
                <ThumbImage
                    src={`${url}`} 
                    alt={title} 
                    loading='lazy' 
                    srcSet={`${url}`}
                    onClick={handleOpen}
                />
            </ThumbContainer>
            <ExpandedImage url={url} title={title} open={open} handleClose={handleClose}/>
        </CentralizedDiv>

    )
}

const CentralizedDiv = styled.div`
    display:flex;
    align-items:center;
    height:100%;
`

const ThumbContainer = styled.div`
    width: 100%;
    height: auto;
    max-height : 800px;
    overflow: hidden;

    
    &:hover {
        cursor : pointer;
    }

`


const ThumbImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit : cover;
`