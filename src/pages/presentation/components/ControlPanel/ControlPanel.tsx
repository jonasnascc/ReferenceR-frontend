import { Grid } from "@mui/material";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { TimerInput } from "../TimerInput/TimerInput";
    import { ControlPanelBlock, ControlPanelPh, ControlPanelTimerBlock } from "./styles";
import { useState } from "react";

export type ControlPanelProps = {    blockTimer: boolean
    reset?: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto: () => void,
    onBlockTimer : (value:boolean) => void,
    onReseted ?: () => void,
    onProgressChange ?: (max:number, progress:number) => void
}

export const ControlPanel = ({reset=false, blockTimer, onNextPhoto, onPreviousPhoto, onBlockTimer, onReseted, onProgressChange} : ControlPanelProps) => {
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
                <Grid container height={"100%"}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <ControlPanelTimerBlock>
                            <TimerInput
                                reset={reset}
                                pause={isPaused}
                                blockTimer={blockTimer}
                                onNextPhoto={handleNext}
                                onPreviousPhoto={handlePrevious}
                                onSecondsChange={onProgressChange}
                                onReseted={onReseted}
                            />
                            <ActionButtons
                                isPaused={isPaused}
                                onNextPhoto={handleNext}
                                onPreviousPhoto={handlePrevious}
                                onPlayPause={handlePlayPause}
                            />
                        </ControlPanelTimerBlock>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </ControlPanelBlock>
        </ControlPanelPh>
    )
}
