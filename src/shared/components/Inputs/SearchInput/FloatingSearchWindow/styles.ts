import styled from "@emotion/styled";

export const VisibilitySwitchBox = styled.div<{visible?:boolean}>((props) => ({
    transition:"visibility .5s ease",
    visibility: props.visible ? "visible" : "hidden"
}))

export const SearchWindowExpand = styled.div<{visible?:boolean}>`
    position:absolute;
    display: flex;
    flex-direction: column;
    width: calc(100% + 2px);
    left: -1px;
    top:-1px;
    transition: height .1s linear;
    border-radius: 5px;
    overflow: hidden;
    word-break: break-all;

    ${props => props.visible?`
        height: auto;
        border: solid 1px rgba(255,255,255, .8);
    `:`
        height:0;
        border: none;
    `}
`

export const SearchWindow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #251e41;
    border-radius: 5px;
    padding: 30px 1vw 10px 1vw;
`

export const ResultTag = styled.div<{sugestions?:boolean}>`
    display: flex;
    background-color: #533FA7;
    align-items: center;
    justify-content: center;
    gap: 1.5vw;
    padding: 3px 1vw;
    border-radius: 5px;
    min-height: 52px;
    font-size: 14px;
    color: white;
    cursor: pointer;

    ${props => props.sugestions&&`
        min-height:auto;
        gap:.5vw;
        padding: 2px .4vw;
    `}
    
    &:active{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, #D217E2 0px 3px 7px -3px;
        border: solid 1px #D217E2;
    }
`

export const TagText = styled.div`
    display: flex;
    flex-direction: column;
`

export const SectionText = styled.h5`
    font-family: "Inter", serif;
    font-size: 12px;
    margin: 10px 0 5px 0 ;
    color: white;
    font-weight: 400;
`
export const SugestionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .7vw;
`

export const AuthorUsername = styled.span`
    font-weight: 600;
`

export const AuthorTagline = styled.span`
    font-size: 12px;
`

export const DeviationsCount = styled.span`
    font-size: 12px;
`