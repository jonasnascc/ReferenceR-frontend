import { Grid } from "@mui/material";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { TimerInput } from "../TimerInput/TimerInput";
    import { ControlPanelBlock, ControlPanelPh, ControlPanelTimerBlock, PhotoAlbum, PhotoAuthor, PhotoMetadataDiv, PhotoTitle } from "./styles";
import { useState } from "react";
import { Album } from "../../../../model/album";

export type ControlPanelProps = {    blockTimer: boolean
    reset?: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto: () => void,
    onBlockTimer : (value:boolean) => void,
    onReseted ?: () => void,
    onProgressChange ?: (max:number, progress:number) => void,
    currentPhotoTitle : string,
    currentAlbum : Album | null,
    
}

export const ControlPanel = ({reset=false, blockTimer, onNextPhoto, onPreviousPhoto, onBlockTimer, onReseted, onProgressChange, currentAlbum, currentPhotoTitle} : ControlPanelProps) => {
    const [isPaused, setIsPaused] = useState(true)

    const handleNext = () => {
        onBlockTimer(true)
        onNextPhoto()
    }
    const handlePrevious = () => {
        onPreviousPhoto()
    }

    const handlePlayPause = () => {
        setIsPaused(state => !state)
    }



    
    return (
        <ControlPanelPh>
            <ControlPanelBlock>
                <ControlPanelTimerBlock>
                    <PhotoMetadataDiv>
                        <PhotoTitle>{currentPhotoTitle}</PhotoTitle>
                        <PhotoAlbum>{currentAlbum?.name}</PhotoAlbum>
                        <PhotoAuthor>{currentAlbum?.author}</PhotoAuthor>
                        
                    </PhotoMetadataDiv>
                    <ActionButtons
                        isPaused={isPaused}
                        onNextPhoto={handleNext}
                        onPreviousPhoto={handlePrevious}
                        onPlayPause={handlePlayPause}
                    >
                        <TimerInput
                            reset={reset}
                            pause={isPaused}
                            blockTimer={blockTimer}
                            onNextPhoto={handleNext}
                            onPreviousPhoto={handlePrevious}
                            onSecondsChange={onProgressChange}
                            onReseted={onReseted}
                        />
                    </ActionButtons>
                </ControlPanelTimerBlock>
            </ControlPanelBlock>
        </ControlPanelPh>
    )
}
