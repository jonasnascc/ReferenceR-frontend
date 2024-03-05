import styled from "styled-components"

export const Carousel = styled.div<{$fullView ?: boolean}>`
    position: relative;
    width: 100%;
    height: ${props => props.$fullView ? "100%" : "300px"};
    margin: 20px 0;
    display: flex;
    justify-content: center;
`

export const ItemsList = styled.ul<{$fullView ?: boolean}>`
    display: flex;
    margin: 0;
    padding: 0 50px;
    position: relative;
    height: 100%;
    width: calc(100% - 100px);
    align-items: center;

    ${props => props.$fullView ? "flex-wrap : wrap;" : ""}

    overflow-x : hidden;
`
export const Item = styled.div`
    margin: 0;
    padding: 0;
`

export const Thumbnail = styled.a<{$size:number}>`
    position: relative;
    display:flex;
    margin: 0;
    padding: 4px 7px;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    text-decoration: none;
    align-items : center;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`

export const Star = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 10;
`

export const AlbumThumb = styled.div<{$selected ?: boolean}>`
    position: relative;
    width : 100%;
    height: 100%;
    background-color : white;
    border-radius : 5px;
    border: ${props => props.$selected ? "2px solid black" : "none"};
`



export const ThumbLabel = styled.div`
    position : absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: 0;
    padding: 5px;
    width: 100%;
    background-color: white;
`

export const AlbumLabelDiv = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
`

export const LabelText = styled.span`
    margin: 0;
    padding: 0;
    color: black;
    word-break: break-word;
`

export const ArrowButtonContainer = styled.div<{$position: "right" | "left"}>`
    display: flex;
    z-index: 11;
    height:100%;
    top: 0px;
    right: ${props => props.$position === "right" ? "0px" : "auto"};
`

export const ArrowButton = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    width: 50px;
    color: #4f5157;

    z-index:1;

    &:hover {
        background-color: #F9F9F9;
        cursor: pointer;
    }

    &:active {
        background-color: #F9F9F9;
    }
`

export const SliderDiv = styled.div<{$left:number}>`
    position: relative;
    ${props => `left: ${props.$left}px;`}
`