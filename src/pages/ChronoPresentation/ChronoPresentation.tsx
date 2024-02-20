import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PhotoArea } from "./components/PhotoArea/PhotoArea";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { useChronoPresentation } from "./hooks/useChronoPresentation";
import { Deviation } from "../../types/photo";
import { Album } from "../../types/album";

export const ChronoPresentation = () => {
    const location = useLocation();
    const [blockTimer, setBlockTimer] = useState(false);
    
    const {
        album,
        currentPhoto,
        history,
        handleNextPhoto,
        handlePreviousPhoto,
        isLoading
    } = useChronoPresentation(location.state);

    const handleNext = () => {
        setBlockTimer(true);
        handleNextPhoto();
    }

    const handleLoaded = () => {
        setBlockTimer(false);
    }
    
    return (
        <Container>
            <PageHeader>{isLoading ? "" : `${currentPhoto !== null ? `${currentPhoto.title} - ` : ""}${album?.name??""}`}</PageHeader>
            <FunctionalArea>
                <Grid container sx={{height:"100%"}}  spacing={"15px"}>
                    <Grid item xs={9}>
                        <PhotoArea photo={currentPhoto} loading={isLoading} handleImageLoaded={handleLoaded}/>
                    </Grid>

                    <Grid item xs={3}>
                        <ControlPanel
                            onTimerIsZero={handleNext}
                            blockTimer={blockTimer}
                            onNextPhoto={handleNext}
                            onPreviousPhoto={handlePreviousPhoto}
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

