import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Album } from "../../model/album";
import { usePresentation } from "../../shared/hooks/presentation/usePresentation";
import { useTimer } from "../../shared/hooks/presentation/useTimer";
import { useTimerInput } from "../../shared/hooks/presentation/useTimerInput";
import { OutlinedButton } from "../../shared/components/Buttons/styles";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { PhotoSlide } from "./components/PhotoSlide/PhotoSlide";
import { PresentationContainer } from "./styles";

export const PresentationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [blockTimer, setBlockTimer] = useState(false)
    const [albums] = useState<Album[]>([])

    const stateAlbums = location.state?.albums??[]
    if(stateAlbums.length === 0){
        navigate("/user/collections")
    }

    useEffect(() => {
        console.log(albums)
    }, [albums])

    const {
        currentPhoto,
        handleNextPhoto,
        handlePreviousPhoto    
    } = usePresentation(stateAlbums)

    const handleBlock = (state:boolean) => {
        setBlockTimer(state)
    }

    if(stateAlbums.length === 0){
        return <Navigate to="/user/collections"/>
    }
    return(
    <PresentationContainer>
        <ControlPanel
            blockTimer={blockTimer}
            onNextPhoto={handleNextPhoto}
            onPreviousPhoto={handlePreviousPhoto}
            onBlockTimer={setBlockTimer}
        />

        {currentPhoto&&<PhotoSlide currentPhoto={currentPhoto} onLoadPhoto={() => handleBlock(false)}/>}

    </PresentationContainer>
    )
}