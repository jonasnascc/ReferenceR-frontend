import styled from "@emotion/styled";

export const GalleryGridContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
`

export const GalleryGridColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    height: 100%;
`

export const GalleryGridImageBlock = styled.div<{maxWidth?:string}>`
    ${props => props.maxWidth&&`
        max-width: ${props.maxWidth};
    `} 
`

export const GalleryGridImage = styled.img<{selected?:boolean, presenting?:boolean}>`
    width: 100%;
    height: auto;
    object-fit: cover;
    ${props=>props.selected&&`
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, #D217E2 0px 3px 7px -3px;
        border: solid 2px #D217E2;
    `}
    ${props=>props.presenting&&`
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, white 0px 3px 7px -3px;
        border: solid 2px white;
    `}
    cursor: pointer;
`