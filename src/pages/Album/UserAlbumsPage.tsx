import { CircularProgress, Container, LinearProgress, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import { Album } from "../../types/album";
import { HeaderControlButtons } from "./components/HeaderControlButtons/HeaderControlButtons";
import { useQuery } from "react-query";
import { fetchFavoritedAlbums } from "../../api/services/Album";

export const UserAlbumsPage = () => {
    const [expandFavorites, setExpandFavorites] = useState(false);
    const [favorites, setFavorites] = useState<Album[]>([]);

    const {isFetching : fetchingAlbums} = useQuery("favorited-albums", () => fetchFavoritedAlbums(), {
        refetchOnWindowFocus : false,
        onSuccess: (data) => setFavorites(data)
    })

    const handleExpandFavorites = (event : any) => {
        setExpandFavorites(event.target.checked);
    }

    return(
        <Container>
            <SectionHeader label="Favorites">
                <HeaderControlButtons onExpand={handleExpandFavorites}/>
            </SectionHeader>
            {
                !fetchingAlbums ? (
                    <AlbumsCarousel albums={favorites} onSelect={() => null} selectedAlbum={null} fullView={expandFavorites}/>
                ) : (<LinearProgress/>)
            }
            <SectionHeader label="My Collections"/>
        </Container>
    )
}