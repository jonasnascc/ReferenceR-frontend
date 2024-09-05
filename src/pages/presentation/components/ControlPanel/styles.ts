import styled from "@emotion/styled";

export const ControlPanelPh = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 20px;
    align-items: center;
`

export const ControlPanelBlock = styled.div`
    position: relative;
    display: flex;
    background-color: #221945;
    opacity: 0.9;
    z-index: 2;
    width: 350px;
    height: 100%;
    flex-direction: column;
    padding: 10px 10px 5px 10px;
    border-radius: 10px;
`

export const ControlPanelActionButtonsDiv = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    
`

export const InfoDiv = styled.div`
    display: flex;
    gap: 1vw;
    align-items: start;
`

export const PhotoMetadataDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    color: white;
    margin-bottom: 10px;
`

export const PhotoTitle = styled.h3`
    margin: 0;
    color: #D217E2
`

export const PhotoAlbum = styled.span`

`

export const PhotoAuthor = styled.span`

`