import React, { useEffect } from "react";
import styled from "styled-components";
import { useTimer } from "../../hooks/useTimer";

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

type TimerProps = {
    onTimerReset : () => void,
    block ?: boolean
}

export const Timer = ({onTimerReset, block = false} : TimerProps) => {
    const timer = useTimer(10, onTimerReset);

    useEffect(()=>{
        timer.handleBlock(block);
    },[block])

    return (
        <TimerTile>
            <TimeText>{`${timer.formatSecondsToTime(timer.seconds)}`}</TimeText>
            <ControlButton onClick={timer.handlePlayPause}>
                {timer.isPaused ? (<PlayArrowIcon/>):(<PauseIcon/>)}
            </ControlButton>

            <ControlButton onClick={timer.handleReset}>
                <RestartAltIcon/>
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
    display:inline;
`

const TimeText = styled.span`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 35px;
    background-color: white;
    height: 50px;
    padding: 0 10px;
    border-radius: 10px;
`