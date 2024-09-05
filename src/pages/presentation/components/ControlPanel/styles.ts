import styled from "@emotion/styled";

export const ControlPanelPh = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    bottom: 20px;
`

export const ControlPanelBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #221945;
    opacity: 0.9;
    width: 350px;
    height: 100%;
    border-radius: 10px;
    padding: 10px 10px 5px 10px;
    z-index: 2;
`

export const ControlPanelTimerBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`

export const PhotoMetadataDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    color: white;
    padding-left: 1vw;
    padding-bottom: 10px;
`

export const PhotoTitle = styled.h3`
    margin: 0;
    color: #D217E2
`

export const PhotoAlbum = styled.span`

`

export const PhotoAuthor = styled.span`

`