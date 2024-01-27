import { Avatar, Grid, Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";

type AuthorBarProps = {
    author:string,
    provider:string,
    albumsSize : number
}

export const AuthorBar = ({albumsSize, author, provider} : AuthorBarProps) => {
    return(
       <BarKeeper>
            <BarContainer>
                <Grid container>
                    <Grid item xs={1}>
                        <AuthorAvatar>
                            <Avatar sx={{width: "50px", height: "50px", backgroundColor:"#5B74B7"}}/>
                        </AuthorAvatar>
                    </Grid>
                    <Grid item xs={9}>
                        <AuthorLabel>
                            <Stack>
                                <AuthorName>{author}</AuthorName>
                                <AlbumsSize>{`${albumsSize} álbuns`}</AlbumsSize>
                            </Stack>
                        </AuthorLabel>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </BarContainer>
       </BarKeeper>
    )
}

const BarKeeper = styled.div`
    height: 70px;
`

const BarContainer = styled.div`
    position: fixed;
    display: flex;
    background-color : #C7CEE1;
    width : 100%;
    height: inherit;
    z-index : 101;
`

const AuthorLabel = styled.div`
    display : flex;
    align-items : center;
    margin-left: 10px;
    height : 100%;
`

const AuthorName = styled.p`
    padding: 0;
    margin: 0;
    font-family: "Inknut Antiqua";
    font-size: 20px;
`

const AlbumsSize = styled.p`
    padding: 0;
    margin: 0;
    font-size: 14px;
`

const AuthorAvatar = styled.div`
    display : flex;
    justify-content : right;
    align-items : center;
    height : 100%;
`

