import { Container, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { AlbumsCarousel } from "../../shared/components/AlbumsCarousel";
import { Album } from "../../types/album";
import { HeaderControlButtons } from "./components/HeaderControlButtons/HeaderControlButtons";
import { useQuery } from "react-query";
import { fetchFavoritedAlbums } from "../../api/services/Album";
import { useAlbums } from "../../shared/hooks/useAlbums";


export const UserCollections = () => {
    const [expandFavorites, setExpandFavorites] = useState(false);
    const [favorites, setFavorites] = useState<Album[]>([]);

    const {isFetching : fetchingAlbums} = useQuery("favorited-albums", () => fetchFavoritedAlbums(), {
        refetchOnWindowFocus : false,
        onSuccess: (data) => setFavorites(data)
    })
    
    const {
        albums,
        handleAlbumSelect,
        selectedAlbum
    } = useAlbums(true);


    return(
        <Container>
            <SectionHeader label="Favorites">
                <HeaderControlButtons selectedAlbum={selectedAlbum}/>
            </SectionHeader>
            {
                !fetchingAlbums ? (
                    <AlbumsCarousel 
                        albums={albums} 
                        onSelect={handleAlbumSelect} 
                        selectedAlbum={selectedAlbum} 
                        fullView={expandFavorites}
                        idAsidentifier
                    />
                ) : (<LinearProgress/>)
            }
            <SectionHeader label="My Collections"/>
        </Container>
    )
}