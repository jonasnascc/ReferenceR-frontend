import styled from "@emotion/styled";

export const NavBarContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 1vw;
    min-height: 70px;
    width: 100%;
    background-color: #141024;
    padding: 0 2vw;
    flex-wrap: wrap;
`

export const Logo = styled.a`
    display: flex;
    align-items: center;
    gap: .5vw;
    flex-wrap: wrap;
    justify-content: center;
    text-decoration: none;
`

export const LogoImage = styled.img`

`

export const LogoText = styled.span`
    color: white;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-style: normal;
`

export const Menu = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    color: white;
    gap: 2vw;
    flex-wrap: wrap;
`

export const MenuListItemContent = styled.li`
    padding: 0;
`

export const MenuListItemAnchor = styled.a<{selected?:boolean}>`
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: #D217E2;
    }
    color: ${props => props.selected?"#D217E2":"white"};
`

export const RightSection = styled.div`
    display: flex;
    padding-right: calc(50px + 2vw);
    flex-direction: row-reverse;
    flex:1;
`

export const SelectedPageSphere = styled.div<{size:string}>`
    ${props => `height:${props.size}; width:${props.size}`};
    background-color: #D217E2;
`