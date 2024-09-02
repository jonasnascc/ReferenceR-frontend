import styled from "@emotion/styled";
import { createTheme } from "@mui/material";

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

export const LinearProgressDiv = styled.div`
    position: absolute;
    width: calc(100% - 30px);
    bottom: 0px;
`


export const ControlPanelTheme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent', // Cor de fundo da barra de progresso
          },
          bar: {
            backgroundColor: '#D217E2', // Cor da barra de progresso
          }
        }
      }
    }
})