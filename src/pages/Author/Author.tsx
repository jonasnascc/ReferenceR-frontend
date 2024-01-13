import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { AuthorBar } from "./components/AuthorBar";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import axios from "../../api/axios";

export const Author = () => {
    const [albums, setAlbums] = useState<any[]>([])
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const urlParams = new URLSearchParams(window.location.search);

    const authorName = urlParams.get("author") ?? "";     
    const provider = urlParams.get("provider") ?? "";        
   
    useEffect(()=>{
        
        axios.get(`author/${authorName}/albums?provider=${provider}`, {
            sendToken : true
        })
            .then((response) => setAlbums(response.data))
            .catch((err) => console.log(err));
        
    }, [])

    const handleSelectAlbum = (albumCode : string) => {
        const album = albums.filter(alb => alb.code === albumCode);
        
    }

    return (
        <Box>
            <AuthorBar albums={albums ?? []} author={authorName} provider={provider} />
            <Container>
                <AlbumsCarousel albums={albums} onSelect={handleSelectAlbum}/>
            </Container>
            {/* <PhotosTable album={selectedAlbum}/> */}
        </Box>
    )
}