import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Album } from "../../model/album";
import { usePresentation } from "../../shared/hooks/presentation/usePresentation";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { PhotoSlide } from "./components/PhotoSlide/PhotoSlide";
import { PresentationContainer } from "./styles";

export const PresentationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

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
        handlePreviousPhoto    
    } = usePresentation(stateAlbums)

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

    const handleReseted = () => {
        setReset(false)
    }

    if(stateAlbums.length === 0){
        return <Navigate to="/user/collections"/>
    }
    return(
    <PresentationContainer>
        <ControlPanel
            reset={reset}
            blockTimer={blockTimer}
            onNextPhoto={handleNext}
            onPreviousPhoto={handlePrevious}
            onBlockTimer={setBlockTimer}
            onReseted={handleReseted}
        />

        <PhotoSlide 
            photos={photos}
            currentIndex={currentPage}
            onLoadPhoto={() => handleBlock(false)}
            onNextSlide={handleNext}
            onPreviousSlide={handlePrevious}
        />

    </PresentationContainer>
    )
}