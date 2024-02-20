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

type TimerProps = {
    onTimerReset ?: () => void,
    onTimerIsZero ?: () => void,
    onNextPhoto ?: () => void,
    onPreviousPhoto ?: () => void,
    block ?: boolean
}

export const Timer = ({onNextPhoto, onPreviousPhoto, onTimerReset, onTimerIsZero, block = false} : TimerProps) => {
    const timer = useTimer(5, onTimerReset, onTimerIsZero);

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
        <TimerTile>
            <ControlButton onClick={timer.handleEdit}>
                {timer.isEditing ? (<SaveIcon/>) : (<EditIcon/>)}
            </ControlButton>

            <TimerInput value={timer.timerValue} disabled={!timer.isEditing} onChange={timer.handleChange}/>

            <ControlButton onClick={timer.handlePlayPause}>
                {timer.isPaused ? (<PlayArrowIcon/>):(<PauseIcon/>)}
            </ControlButton>

            <ControlButton onClick={timer.handleReset}>
                <RestartAltIcon/>
            </ControlButton>

            <ControlButton>
                <SkipPreviousIcon onClick={handlePreviousPhoto}/>
            </ControlButton>

            <ControlButton onClick={handleNextPhoto}>
                <SkipNextIcon/>
            </ControlButton>
        </TimerTile>
    )
}

const TimerTile = styled.div`
    height: 70px;
    width: 100%;
    border: solid 1px black;
`

const ControlButton = styled.div`
    cursor: pointer;
    display: inline;

    &:active {
        background-color: rgba(0,0,0,.5);
        color: white;
    }
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
`