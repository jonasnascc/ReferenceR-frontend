import { Avatar, Grid, Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";

type AuthorBarProps = {
    author:string,
    provider:string,
    albums : any[]
}

export const AuthorBar = ({albums, author, provider} : AuthorBarProps) => {
    return(
        <BarContainer>
            <Grid container>
                <Grid item xs={1}>
                    <AuthorAvatar>
                        <Avatar sx={{width: "73px", height: "73px", backgroundColor:"#263866"}}/>
                    </AuthorAvatar>
                </Grid>
                <Grid item xs={11}>
                    <AuthorLabel>
                        <Stack>
                            <AuthorName>{author}</AuthorName>
                            <AlbumsSize>{`${albums.length} álbuns`}</AlbumsSize>
                        </Stack>
                        
                    </AuthorLabel>
                </Grid>
            </Grid>
            
        </BarContainer>
    )
}

const BarContainer = styled.div`
    display: flex;
    background-color : #C7CEE1;
    width : 100%;
    height: 90px;
`

const AuthorLabel = styled.div`
    display : flex;
    align-items : center;
    margin-left: 30px;
    height : 100%;
`

const AuthorName = styled.p`
    padding: 0;
    margin: 0;
    font-family: "Inknut Antiqua";
    font-size: 22px;
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