import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { AlbumsCarousel } from "../../../shared/components/AlbumsCarousel/AlbumsCarousel";

export const AuthorInfo = ({albums, author, provider} : {author:string, provider:string, albums : any[]}) => {   
    return (
        <AuthorDiv>

            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <AvatarContainer>
                        <Avatar sx={{width: "233px", height: "233px"}}/>
                    </AvatarContainer>
                </Grid>
                <Grid item xs={8}>
                    <AuthorBlock>
                        <InfoContainer>
                            <AuthorLabel>{author}</AuthorLabel>
                            <DeviantArtLink href={`https://www.deviantart.com/${author}/gallery`} target="_blank">{`Abrir em ${provider}`}</DeviantArtLink>
                        </InfoContainer>
                        {/* <AlbumsCarousel albums={albums}/> */}
                    </AuthorBlock>
                </Grid>
            </Grid>
        </AuthorDiv>
    )
}
const AuthorBlock = styled.div`
    position: relative;
    padding-top: 60px;
    margin-left: 80px;
    height: 100%;
`
const InfoContainer = styled.div`
   display: block;
`
const AuthorLabel = styled.p`
    font-family: "Inknut Antiqua";
    font-size : 32px;
    margin : 0;
    padding : 0;
`
const DeviantArtLink = styled.a`
    text-decoration: none;
    font-size: 13px;
    color: #4660A4;
    cursor: pointer;
`
const AuthorDiv = styled.div`
    display: flex;
    height : 360px;
    weight : 100%;
    background-color : #D9D9D9;
`

const AvatarContainer = styled.div`
    display: flex;
    width: 100%;    
    height : 100%;
    align-items: center;
    justify-content: center;
`

