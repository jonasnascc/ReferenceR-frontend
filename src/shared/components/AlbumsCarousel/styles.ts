import styled from "@emotion/styled";

export const AlbumCarouselSlideItem = styled.div<{selected ?: boolean}>`
    position: relative;
    height: 180px;
    width: auto;
    /* border: ${props => props.selected ? "solid 2px white" : "none"}; */
    border-radius: 10px;
    background-color: #141024;
    padding: 10px;//#D217E2
    ${props => props.selected ? `
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, #D217E2 0px 3px 7px -3px;
        border: solid 2px #D217E2;
    ` : `
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    `}
    margin: 10px 0 10px 0;
    cursor:pointer;
`

export const SlideItemPhoto = styled.div`
    height: 125px;
`

export const AlbumCarouselItemDescription = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    color: white;
    overflow: auto;
    word-break: break-all;
    word-wrap: break-word;
    padding: 10px 0;
    font-size: 14px;
    
    overflow: hidden;
    cursor: pointer;
`

export const DescriptionAlbumName = styled.h3`
    margin: 0;
    padding: 0;

`
export const DescriptionAlbumSize = styled.span`

`

export const AlbumCarouselImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    
    border-radius: 5px;
`

export const AlbumCarouselBackground = styled.div`
    background-color: #32256A;
    padding: 0 1vw;
`