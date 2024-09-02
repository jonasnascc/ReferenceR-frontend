import React from "react";
import { OutlinedButton } from "../../../../shared/components/Buttons/styles";

type ActionButtonsProps = {
    isPaused: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto : () => void,
    onPlayPause: () => void
}

export const ActionButtons = ({isPaused, onPreviousPhoto, onNextPhoto, onPlayPause} : ActionButtonsProps) => {

    return(
        <>  
            <div>
                <OutlinedButton color="white" onClick={onPreviousPhoto} >previous</OutlinedButton>
                <OutlinedButton color="white" onClick={onPlayPause}>{isPaused ? "Start" : "Pause"}</OutlinedButton>
                <OutlinedButton color="white" onClick={onNextPhoto} >next</OutlinedButton>
            </div>
        </>
    )
}