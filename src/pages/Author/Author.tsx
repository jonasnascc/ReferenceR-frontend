import React, { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { AuthorBar } from "./components/AuthorBar";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import axios from "../../api/axios";
import { PhotosTable } from "./components/PhotosTable";
import { SearchContext } from "../../context/Search/SearchContext";
import { Album } from "../../types/album";

export const Author = () => {
    const {author, provider} = useContext(SearchContext);

    const [albums, setAlbums] = useState<Album[]>([])
    const [selectedAlbum, setSelectedAlbum] = useState<Album|null>(null);
   
    useEffect(()=>{
        axios.get(`author/${author}/albums?provider=${provider}`, {
            sendToken : true
        })
            .then((response) => setAlbums(response.data))
            .catch((err) => console.log(err));
    }, [])

    const handleSelectAlbum = (albumCode : string) => {
        const album : Album[] = albums.filter(alb => alb.code === albumCode);
        setSelectedAlbum(album[0]);
    }

    return (
        <>
        {
            author!==null&&provider!==null&&(
                <Box>
                    <AuthorBar albums={albums ?? []} author={author} provider={provider} />
                    <Container>
                        <AlbumsCarousel albums={albums} onSelect={handleSelectAlbum}/>
                    </Container>
                    {(selectedAlbum !== null) && <PhotosTable album={selectedAlbum}/>}
                </Box>
            )
        }
        </>

    )
}