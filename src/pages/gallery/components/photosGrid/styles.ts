import styled from "@emotion/styled";
import { CircularProgress, ImageList, ImageListItem } from "@mui/material";

export const PhotosGridContainer = styled.div`
    background-color: none;
    color: white;
`

export const PhotosGridImage = styled.img<{selected?:boolean}>`
    min-height: 100%;
    max-width: auto;
    object-fit: cover;
    ${props=>props.selected&&`
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, #D217E2 0px 3px 7px -3px;
        border: solid 2px #D217E2;
    `}
    cursor: pointer;
`

export const CustomImageList = styled(ImageList)`
    height: auto;
    width: 100%;
    margin-top: 0;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr))!important;
    overflow: hidden;
`

export const CustomImageListItem = styled(ImageListItem)`
    width: 100%;
    max-height: 200px;
`

export const CustomCircularProgress = styled(CircularProgress)`
    color: white;
`

export const LoadingImageBlock = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: white;
`