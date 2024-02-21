import React, { useEffect } from "react";
import styled from "styled-components";
import { useTimer } from "../../hooks/useTimer";

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Divider } from "@mui/material";

type TimerProps = {
    onTimerReset ?: () => void,
    onTimerIsZero ?: () => void,
    onNextPhoto ?: () => void,
    onPreviousPhoto ?: () => void,
    block ?: boolean
}

export const Timer = ({onNextPhoto, onPreviousPhoto, onTimerReset, onTimerIsZero, block = false} : TimerProps) => {
    const timer = useTimer(10, onTimerReset, onTimerIsZero);

    useEffect(()=>{
        timer.handleBlock(block);
    },[block])

    const handleNextPhoto = () => {
        if(onNextPhoto) {
            onNextPhoto();
            timer.handleReset();
        }
    }

    const handlePreviousPhoto = () => {
        if(onPreviousPhoto) {
            onPreviousPhoto();
            timer.handleReset();
        }
    }

    return (
        <ControlsDiv>
            <Divider/>
                <TimerTile>
                    <ControlButton onClick={timer.handleEdit}>
                        {timer.isEditing ? (<SaveIcon/>) : (<EditIcon/>)}
                    </ControlButton>

                    <TimerInput value={timer.timerValue} disabled={!timer.isEditing} onChange={timer.handleChange}/>

                    <ControlButton onClick={timer.handleReset}>
                        <RestartAltIcon/>
                    </ControlButton>
                </TimerTile>
                <PlayerTile>
                    <ControlButton onClick={handlePreviousPhoto}>
                        <SkipPreviousIcon/>
                    </ControlButton>

                    <ControlButton $play={true} $paused={timer.isPaused} onClick={timer.handlePlayPause}>
                        {timer.isPaused ? (<PlayArrowIcon/>):(<PauseIcon/>)}
                    </ControlButton>

                    <ControlButton onClick={handleNextPhoto}>
                        <SkipNextIcon/>
                    </ControlButton>
                </PlayerTile>
            <Divider/>
        </ControlsDiv>
    )
}

const ControlsDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 50px 20px;
`

const Tile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const TimerTile = styled(Tile)`
    margin: 20px 0 0 0;
`

const PlayerTile = styled(Tile)`
    margin: 10px 0;
`

const ControlButton = styled.div<{$play ?: boolean, $paused ?: boolean}>`
    display: flex;
    cursor: pointer;
    padding: 5px;

    &:active {
        background-color: rgba(0,0,0,.5);
        color: white;
    }

    ${props => props.$play && "color: white; border-radius: 50%;"}
    ${props => props.$paused ? "background-color: #00c468;" : (props.$play ? "background-color: #fc0000;" : "")}
`

const TimerInput = styled.input`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 35px;
    background-color: white;
    height: 50px;
    width: 110px;
    padding: 0 10px;
    border: none;
    border-radius: 10px;

    &:disabled {
        color: black;
    }
`