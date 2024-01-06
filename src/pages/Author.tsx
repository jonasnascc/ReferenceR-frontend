import React, { useEffect, useState } from "react";
import { AuthorInfo } from "./components/AuthorInfo";
import { Box, Container } from "@mui/material";
import { AuthorBar } from "./components/AuthorBar";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import { PhotosTable } from "./components/PhotosTable";

export const Author = () => {
    const [albums, setAlbums] = useState<any[]>([])
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const urlParams = new URLSearchParams(window.location.search);

    const authorName = urlParams.get("author") ?? "";     
    const provider = urlParams.get("provider") ?? "";        
   
    useEffect(()=>{
        fetch(`http://localhost:8080/api/author/${authorName}/albums?provider=${provider}`)
        .then((response) => response.json())
        .then((data) => setAlbums(data))
        .then(() => console.log(albums));
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