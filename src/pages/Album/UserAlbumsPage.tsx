import { Container } from "@mui/material";
import React from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { AlbumsCarousel } from "./components/AlbumsCarousel";

export const UserAlbumsPage = () => {
    return(
        <Container>
            <SectionHeader label="Favorites"/>
            

            <SectionHeader label="My Collections"/>
           
        </Container>
    )
}