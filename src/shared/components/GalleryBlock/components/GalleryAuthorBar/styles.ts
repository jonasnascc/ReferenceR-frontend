import styled from "@emotion/styled";

export const AuthorTile = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    min-height: 70px;
    background-color: #141024;
    color: white;
    padding: 0 1.5vw;
    flex-wrap: wrap;
    padding: 10px;
`

export const AuthorNameBox = styled.div`
    margin-right: 2vw;
`

export const AuthorName = styled.h4`
    margin: 0;
    padding: 0;
`

export const AuthorTagline = styled.h5`
    margin: 0;
    padding: 0;
    font-weight: 400;
`

export const ButtonsDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    flex: 1;
`

export const StatsBlock = styled.div`
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    gap: 1.5vw;

`

export const StatTile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover{
        color: #D217E2;
    }
    cursor:default;
`
export const StatNumber = styled.span`
font-size: 16px;
`
export const StatText = styled.span`
    font-size: 10px;
`


