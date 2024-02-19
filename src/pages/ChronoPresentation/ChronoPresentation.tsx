import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { PhotoArea } from "./components/PhotoArea/PhotoArea";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { useChronoPresentation } from "./hooks/useChronoPresentation";
import { Deviation } from "../../types/photo";
import { Album } from "../../types/album";

export const ChronoPresentation = () => {
    const location = useLocation();
    
    const {
        album,
        currentPhoto,
        history,
        handleNextPhoto,
        isLoading
    } = useChronoPresentation(location.state);
    
    return (
        <Container>
            {JSON.stringify(album)}
            {JSON.stringify(history)}
            <PageHeader>Album name</PageHeader>
            <FunctionalArea>
                <Grid container sx={{height:"100%"}}  spacing={"15px"}>
                    <Grid item xs={9}>
                        <PhotoArea photo={currentPhoto} loading={isLoading}/>
                    </Grid>

                    <Grid item xs={3}>
                        <ControlPanel
                            onTimerReset={handleNextPhoto}
                        />
                    </Grid>
                </Grid>
            </FunctionalArea>
        </Container>
    )
}

const FunctionalArea = styled.h1`
    position: relative;
    width: 100%;
    height: calc(100vh - 150px);
    margin-bottom: 20px;
`

const PageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0 10px 0;
    padding: 0;
    height: 50px;
    width: 100%;
    background-color: #3A3A3A;
    color: white;
    font-size: 20px;
    font-weight: lighter;
`

