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
    position: relative;
    ${props => props.maxWidth&&`
        max-width: ${props.maxWidth};
    `} 
`
export const GalleryGridImageContainer = styled.div<{selected?:boolean, presenting?:boolean}>`
    ${props=>props.selected&&`
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, #D217E2 0px 3px 7px -3px;
        border: solid 2px #D217E2;
    `}
    ${props=>props.presenting&&`
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, white 0px 3px 7px -3px;
        border: solid 2px white;
    `}
    cursor: pointer;
    background-color: #191431;
    padding: 30px .4vw 5px .4vw;
    border-radius: 5px;
    margin-bottom: 1vh;
`

export const GalleryGridImageDescription = styled.div`
    padding: 0 .2vw;
    text-align: center;
    margin-bottom: .8vh;

`

export const GalleryGridImage = styled.img`
    width: 100%;
    height: auto;
    min-height: 35vh;
    object-fit: cover;
`