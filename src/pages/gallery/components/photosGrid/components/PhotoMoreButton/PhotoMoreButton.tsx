import { Popover } from "@mui/material";
import { Deviation, SimplePhoto } from "../../../../../../model/photo";
import { ButtonDiv, MoreButton, OptionsList, PhotoOption } from "./styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useLocation } from "react-router-dom";
import { CollectionsListModal } from "../../../../../../shared/components/CollectionsModal/CollectionsListModal";
import { Album } from "../../../../../../model/album";

type PhotoMoreButtonProps = {
    photo : Deviation,
    collectionId ?: number,
    album ?: Album
}

export const PhotoMoreButton = ({photo, album}:PhotoMoreButtonProps) => {
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openColList, setOpenColList] = useState(false)

    const {
        id,
        code,
        title,
        url,
        mature,
        page,
        albumCode,
        thumbUrl,
        author
    } = photo

    const collectionsPage = location.pathname.startsWith("/user/collections")

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenColList = () => {
        setOpenColList(true)
    }

    const handleCloseColList = () => {
        setOpenColList(false)
    }

    const open = Boolean(anchorEl);
    const popId = open ? 'photo-popover' : undefined;
    return (
        <>
        <Popover 
            id={popId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <OptionsList>
            {
                collectionsPage? 
                    <PhotoOption style={{color:"red"}}><DeleteIcon/>Delete</PhotoOption> 
                    : 
                    (
                        <>
                        <PhotoOption onClick={handleOpenColList}><AddToPhotosIcon/>Add to collection</PhotoOption>
                            <CollectionsListModal 
                                open={openColList} 
                                onClose={handleCloseColList} 
                                selectedAlbums={
                                    album ? [{
                                        album: album,
                                        photos: [{
                                            id,
                                            code,
                                            title,
                                            url,
                                            mature,
                                            page,
                                            albumCode,
                                            thumbUrl,
                                            author : author.name
                                        }],
                                        exceptPhotos: [],
                                        saveAsFavorite: false
                                    }] : []
                                }
                            />
                        </>
                    )
            }
            </OptionsList>
        </Popover>
        <ButtonDiv>
            <MoreButton onClick={handleClick} aria-describedby={popId}><MoreVertIcon/></MoreButton>
        </ButtonDiv>
        </>
    );
}