import { Grid, LinearProgress } from "@mui/material";
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
    const [progress, setProgress] = useState<number|null>(null)

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

    const handleProgressChange = (max:number, actualSeconds:number) => {
        if(actualSeconds >= 0)
            setProgress(100 - ((actualSeconds*100)/max))
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
                            onSecondsChange={handleProgressChange}
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
                {progress&&<LinearProgress variant="determinate" value={progress}/>}
            </ControlPanelBlock>
        </ControlPanelPh>
    )
}
