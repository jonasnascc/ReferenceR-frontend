import { Grid, LinearProgress } from "@mui/material";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { TimerInput } from "../TimerInput/TimerInput";
import { ControlPanelBlock, ControlPanelPh, ControlPanelTheme, ControlPanelTimerBlock, LinearProgressDiv } from "./styles";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

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
    }
    const handlePrevious = () => {
        onPreviousPhoto()
    }

    const handlePlayPause = () => {
        setIsPaused(state => !state)
    }

    const handleProgressChange = (max:number, actualSeconds:number) => {
        if(actualSeconds >= 0)
            setProgress(100 - ((actualSeconds*100)/max))
    }
    
    return (
        <ThemeProvider theme={ControlPanelTheme}>
        <ControlPanelPh>
            <ControlPanelBlock>
                <Grid container height={"100%"}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <ControlPanelTimerBlock>
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
                        </ControlPanelTimerBlock>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <LinearProgressDiv>{progress&&<LinearProgress variant="determinate" value={progress}/>}</LinearProgressDiv>
            </ControlPanelBlock>
        </ControlPanelPh>
        
        </ThemeProvider>
        
    )
}
