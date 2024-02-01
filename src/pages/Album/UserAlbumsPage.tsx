import { Container, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { AlbumsCarousel } from "./components/AlbumsCarousel";
import { Album } from "../../types/album";
import axios from "../../api/axios";

export const UserAlbumsPage = () => {
    const [expandFavorites, setExpandFavorites] = useState(false);
    const [favorites, setFavorites] = useState<Album[]>([]);

    useEffect(() => {
        fetchFavorites();
    }, [])

    const fetchFavorites = async () => {
        let response : any = null;
        await axios.get("albums/favorites", {sendToken:true})
        .then((resp) => response = resp)
        .catch((error) => console.log(error))

        if(response !== null ) setFavorites(response.data);
    }

    return(
        <Container>
            <Switch onChange={() => setExpandFavorites(!expandFavorites)}/>
            <SectionHeader label="Favorites"/>
            <AlbumsCarousel albums={favorites} onSelect={() => null} selectedAlbum={null} fullView={expandFavorites}/>
            <SectionHeader label="My Collections"/>
        </Container>
    )
}