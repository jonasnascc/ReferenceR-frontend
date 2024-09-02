import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const Timer = styled.div`
    position: relative;
    height: 40px;
    width: 128px;
`

export const EditTile = styled.div<{color?:string}>`
    position: absolute;
    right: 5px;
    top: 8px;
    cursor: pointer;
    ${props => props.color ? `color:${props.color};` : ""}

    &:hover {
        color: #D217E2
    }
`

export const TimerInputBase = styled.input`
    height: 40px;
    width: 128px;
    border-radius: 15px;
    border: solid 1px white;
    outline: none;
    padding-right: 28px;
    text-align: center;
    font-size: 30px;
    padding-top: 3px;
    
    color: black;


    &:disabled {
        color: white;
        background-color: transparent;
    }
`