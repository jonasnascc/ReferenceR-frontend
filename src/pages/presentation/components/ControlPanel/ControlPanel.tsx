import { Grid } from "@mui/material";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { TimerInput } from "../TimerInput/TimerInput";
import { ControlPanelBlock, ControlPanelPh } from "./styles";
import { useState } from "react";

export type ControlPanelProps = {
    onNextPhoto : () => void,
    onPreviousPhoto: () => void,
    onBlockTimer : (value:boolean) => void,
    blockTimer: boolean
}

export const ControlPanel = ({blockTimer, onNextPhoto, onPreviousPhoto, onBlockTimer} : ControlPanelProps) => {
    const [isPaused, setIsPaused] = useState(true)

    const handleNext = () => {
        onBlockTimer(true)
        onNextPhoto()
        // handleReset()
    }
    const handlePrevious = () => {
        onPreviousPhoto()
        // handleReset()
    }

    const handlePlayPause = () => {
        setIsPaused(state => !state)
    }
    
    return (
        <ControlPanelPh>
            <ControlPanelBlock>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TimerInput
                            pause={isPaused}
                            blockTimer={blockTimer}
                            onNextPhoto={handleNext}
                            onPreviousPhoto={handlePrevious}
                        />
                        <ActionButtons
                            isPaused={isPaused}
                            onNextPhoto={handleNext}
                            onPreviousPhoto={handlePrevious}
                            onPlayPause={handlePlayPause}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </ControlPanelBlock>
        </ControlPanelPh>
    )
}
