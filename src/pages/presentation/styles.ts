import styled from "@emotion/styled";
import { createTheme } from "@mui/material";

export const PresentationContainer = styled.div`
    position: relative;
    background-color: #141024;
    min-height: 100vh;
    width: 100vw;
`


export const LinearProgressDiv = styled.div`
    position: absolute;
    width: calc(100%);
    height: 10px;
    top: 0;
    left: 0;
    z-index: 10;
`


export const ChronoShuffleTheme = createTheme({
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