import { ActionButtons } from "../ActionButtons/ActionButtons";
import { TimerInput } from "../TimerInput/TimerInput";
import { ControlPanelBlock, ControlPanelPh, InfoDiv, PhotoAlbum, PhotoAuthor, PhotoMetadataDiv, PhotoTitle } from "./styles";
import { useState } from "react";
import { Album } from "../../../../model/album";
import { ControlPanelExpandButton } from "../../../../shared/components/ControlPanelExpandButton/ControlPanelExpandButton";
import { FooterControlPanel } from "../FooterControlPanel/FooterControlPanel";

export type ControlPanelProps = {    blockTimer: boolean
    reset?: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto: () => void,
    onBlockTimer : (value:boolean) => void,
    onReseted ?: () => void,
    onProgressChange ?: (max:number, progress:number) => void,
    currentPhotoTitle : string,
    currentAlbum : Album | null,
    footerActive : boolean,
    onToggleFooter : () => void
    
}

export const ControlPanel = (props : ControlPanelProps) => {
    const {
        reset=false, 
        blockTimer, 
        footerActive, 
        onToggleFooter, 
        onNextPhoto, 
        onPreviousPhoto, 
        onBlockTimer, 
        onReseted, 
        onProgressChange, 
        currentAlbum, 
        currentPhotoTitle
    } = props

    const [isPaused, setIsPaused] = useState(true)
    const [currentTime, setCurrentTime] = useState<number>()

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

    const handleToggleFooter = () => {
        onToggleFooter()
    }

    const handleTimeChange = (max: number, progress: number) => {
        setCurrentTime(() => progress)
        if(onProgressChange) onProgressChange(max, progress)
    }

    const loadActionButtons = () => {
        return (
            <ActionButtons
                isPaused={isPaused}
                onNextPhoto={handleNext}
                onPreviousPhoto={handlePrevious}
                onPlayPause={handlePlayPause}
                footerMode={footerActive}
            >
                <TimerInput
                    reset={reset}
                    pause={isPaused}
                    startFrom={currentTime}
                    blockTimer={blockTimer}
                    onNextPhoto={handleNext}
                    onPreviousPhoto={handlePrevious}
                    onSecondsChange={handleTimeChange}
                    onReseted={onReseted}
                />
            
            </ActionButtons>
    )
    }

    if(footerActive) return (
        <FooterControlPanel {...props}>
            {loadActionButtons()}
        </FooterControlPanel>
    )
    else return (
        <ControlPanelPh>
            <ControlPanelBlock>
                <InfoDiv>
                    <ControlPanelExpandButton active={footerActive} handleClick={handleToggleFooter}/>

                    <PhotoMetadataDiv>
                        <PhotoTitle>{currentPhotoTitle}</PhotoTitle>
                        <PhotoAlbum>{currentAlbum?.name}</PhotoAlbum>
                        <PhotoAuthor>{currentAlbum?.author}</PhotoAuthor>
                    </PhotoMetadataDiv>
                </InfoDiv>

                {loadActionButtons()}
            </ControlPanelBlock>
        </ControlPanelPh>
    )
}