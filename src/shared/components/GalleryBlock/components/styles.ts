import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const HeaderBlock = styled.div`
`
export const HeaderContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    padding: 20px 0;
    width: 100%;
`

export const AuthorTile = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    margin: 20px 3vw;
`

export const AlbumTile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const AuthorCarouselBlock = styled.div`
    padding: 5px 0 20px 0;
`