import React, { ReactNode } from "react";
import { OutlinedButton } from "../../../../shared/components/Buttons/styles";
import { ActionButton, ActionButtonsDiv } from "./styles";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type ActionButtonsProps = {
    isPaused: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto : () => void,
    onPlayPause: () => void,
    children ?: ReactNode
}

export const ActionButtons = ({isPaused, onPreviousPhoto, onNextPhoto, onPlayPause, children} : ActionButtonsProps) => {

    return(
        <>  
            <ActionButtonsDiv>
                <ActionButton onClick={onPreviousPhoto} ><SkipPreviousIcon/></ActionButton>

                {children}
                
                <ActionButton onClick={onPlayPause}>{isPaused ? <PlayArrowIcon/> : <PauseIcon/>}</ActionButton>
                
                <ActionButton onClick={onNextPhoto}><SkipNextIcon/></ActionButton>
            </ActionButtonsDiv>
        </>
    )
}