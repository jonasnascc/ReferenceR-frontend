import styled from "@emotion/styled";

export const ControlPanelPh = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 120px;
    width: 100%;
    bottom: 20px;
`

export const ControlPanelBlock = styled.div`
    position: relative;
    flex-direction: column;
    background-color: #221945;
    opacity: 0.9;
    width: 40%;
    height: 100%;
    border-radius: 10px;
    padding: 10px 10px 5px 10px;
    z-index: 2;
`

export const ControlPanelTimerBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
`
