import styled from "@emotion/styled";

export const Timer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 110px;
`

export const EditTile = styled.div<{color?:string}>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    right: 5px;
    top: 4px;
    cursor: pointer;
    ${props => props.color ? `color:${props.color};` : ""}

    &:hover {
        color: #D217E2
    }
`

export const TimerInputBase = styled.input`
    height: 34px;
    width: 110px;
    border-radius: 15px;
    border: solid 1px white;
    outline: none;
    padding-right: 24px;
    text-align: center;
    font-size: 24px;
    padding-top: 3px;
    
    color: black;


    &:disabled {
        color: white;
        background-color: transparent;
    }
`