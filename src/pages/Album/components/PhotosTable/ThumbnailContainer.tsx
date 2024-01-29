
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FavoriteStar } from '../../../../shared/components/FavoriteStar';
import { Deviation } from '../../../../types/photo';

type ThumbnailContainerProps = {
    url : string,
    title : string,
    onSelect ?: () => any,
    selected ?: boolean,
    photo : Deviation
}

export const ThumbnailContainer = ({ photo, onSelect = () => {}, selected = false} : ThumbnailContainerProps) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(false);

    useEffect(() => {
        setSelectedPhoto(selected);
    }, [selected])

      
    const handleOpen = () => {
        setOpen(true);
    };
    
    return (
        <CentralizedDiv>
            <ThumbContainer $selected={selectedPhoto} onClick={() => onSelect()}>
                {photo.favorited && 
                    <StarContainer>
                        <FavoriteStar photo={photo} active/>
                    </StarContainer>
                }
                <ThumbImage
                    src={`${photo.thumbUrl ? photo.thumbUrl : photo.url}`} 
                    alt={photo.title} 
                    loading='lazy' 
                    srcSet={`${photo.thumbUrl ? photo.thumbUrl : photo.url}`}
                    onClick={handleOpen}
                />
            </ThumbContainer>
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


const StarContainer = styled.div`
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    color : #ffca00;

`
