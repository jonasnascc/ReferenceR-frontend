import styled from "@emotion/styled"

export const HeaderBlock = styled.div`
`
export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    width: 100%;
    margin: 20px 0 10px 0;
`

export const AlbumTile = styled.div`
    display: flex;
    align-items: center;
    gap: .5vw;
    flex-wrap: wrap;
`

export const HeaderText = styled.h4`
    margin: 0;
    color: white;
`

export const AlbumTitle = styled(HeaderText)`
    
`

export const AlbumSize = styled(HeaderText)`
    font-weight: 400;
`


export const Sphere = styled.div<{size:string}>`
    ${props => `height:${props.size}; width:${props.size}`};
    background-color: white;
    border-radius: 50%;
`
