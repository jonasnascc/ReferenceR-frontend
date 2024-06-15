import styled from "@emotion/styled";

export const AlbumCarouselSlideItem = styled.div<{selected ?: boolean}>`
    position: relative;
    height: 200px;
    width: auto;
    border: ${props => props.selected ? "solid 2px white" : "none"};
    
`

export const AlbumCarouselItemDescription = styled.div`
    position:absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    min-height: 40%;
    bottom: 0;
    left: 0;
    background-color: black;
    color: white;
    overflow: auto;
    word-break: break-all;
    word-wrap: break-word;
    z-index: 5;
    padding: 10px 0;
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
`

export const AlbumCarouselBackground = styled.div`
    background-color: #120d25;
    padding: 10px;
`