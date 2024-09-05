import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Album } from "../../model/album";
import { usePresentation } from "../../shared/hooks/presentation/usePresentation";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { PhotoSlide } from "./components/PhotoSlide/PhotoSlide";
import { ChronoShuffleTheme, LinearProgressDiv, PresentationContainer } from "./styles";
import { LinearProgress, ThemeProvider } from "@mui/material";

export const PresentationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [footerActive, setFooterActive] = useState(false)

    const [progress, setProgress] = useState<number|null>(null)
    const [blockTimer, setBlockTimer] = useState(false)
    const [reset, setReset] = useState(false)
    const [albums] = useState<Album[]>([])

    const stateAlbums = location.state?.albums??[]
    if(stateAlbums.length === 0){
        navigate("/user/collections")
    }

    useEffect(() => {
        console.log(albums)
    }, [albums])

    const {
        photos,
        currentPhoto,
        currentPage,
        handleNextPhoto,
        handlePreviousPhoto,
        handleIndexChange
    } = usePresentation(stateAlbums)

    const handleProgressChange = (max:number, actualSeconds:number) => {
        if(actualSeconds >= 0)
            setProgress(100 - ((actualSeconds*100)/max))
    }

    const handleBlock = (state:boolean) => {
        setBlockTimer(state)
    }

    const handleNext = () => {
        setReset(true)
        handleNextPhoto()
    }

    const handlePrevious = () => {
        setReset(true)
        handlePreviousPhoto()
    }

    const handleChangeIndex = (index : number) => {
        setReset(true)
        handleIndexChange(index)
    }

    const handleReseted = () => {
        setReset(false)
    }

    const handleToggleFooter = () => {
        setFooterActive(state => !state)
    }

    if(stateAlbums.length === 0){
        return <Navigate to="/user/collections"/>
    }
    return(
    <ThemeProvider theme={ChronoShuffleTheme}>
        <PresentationContainer footerActive={false}>
                <PhotoSlide 
                    photos={photos}
                    currentIndex={currentPage}
                    onLoadPhoto={() => handleBlock(false)}
                    onIndexChange={handleChangeIndex}
                    countFooter={footerActive}
                />
                
                <ControlPanel
                    footerActive={footerActive}
                    reset={reset}
                    blockTimer={blockTimer}
                    onNextPhoto={handleNext}
                    onPreviousPhoto={handlePrevious}
                    onBlockTimer={setBlockTimer}
                    onReseted={handleReseted}
                    onProgressChange={handleProgressChange}
                    onToggleFooter={handleToggleFooter}
                    currentPhotoTitle={currentPhoto?.title??""}
                    currentAlbum={photos.filter(ph => ph.photo?.code === currentPhoto?.code)[0]?.album??null}
                />
        </PresentationContainer>
        <LinearProgressDiv>{progress&&<LinearProgress variant="determinate" value={progress}/>}</LinearProgressDiv>
    </ThemeProvider>
    )
}