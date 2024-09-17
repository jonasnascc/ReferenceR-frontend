import styled from "@emotion/styled";

export const SelectButtonsDiv = styled.div<{active:boolean}>`
    display: flex;
    justify-content: space-evenly;
    gap: 1vw;
    padding: 5px 0;
    ${props => `
        ${props.active && `
            background-color: #141024;    
        `}
    `}
    border-radius: 5px;
    transition: background-color .4s ease-out;
    flex-wrap: wrap;
`