import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Album } from "../../model/album";
import { usePresentation } from "../../shared/hooks/presentation/usePresentation";
import { useTimer } from "../../shared/hooks/presentation/useTimer";
import { useTimerInput } from "../../shared/hooks/presentation/useTimerInput";
import { OutlinedButton } from "../../shared/components/Buttons/styles";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";

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

    if(stateAlbums.length === 0){
        return <Navigate to="/user/collections"/>
    }
    return(<>
        <ControlPanel
            blockTimer={blockTimer}
            onNextPhoto={handleNextPhoto}
            onPreviousPhoto={handlePreviousPhoto}
            onBlockTimer={setBlockTimer}
        />
        {
            currentPhoto&&(
                <div>
                    <img
                        src={currentPhoto.url}
                        alt={currentPhoto?.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "90vh"
                        }}
                        onLoad={() => setBlockTimer(false)}
                    />
                </div>
            )
        }
    </>)
}