import styled from "@emotion/styled";

export const HomeContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    background-color: #141024;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
`


export const Logo = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    gap: .5vw;
    flex-wrap: wrap;
    justify-content: end;
    text-decoration: none;
    flex-direction: column;
    max-height: 50%;
`

export const LogoImage = styled.img`
    height: 96px;
`

export const LogoText = styled.span`
    color: white;
    font-size: 32px;
    font-family: "Inter", sans-serif;
    font-style: normal;
`

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex: 1;
    width: 540px;

    @media (max-width: 540px){
        width: calc(100% - 2vw);
    }
`