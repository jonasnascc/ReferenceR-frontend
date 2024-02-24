import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTimer } from "../../hooks/useTimer";

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CloseIcon from '@mui/icons-material/Close';

import { Divider } from "@mui/material";
import { useTimerInput } from "../../hooks/useTimerInput";

type TimerProps = {
    onTimerReset ?: () => void,
    onTimerIsZero ?: () => void,
    onNextPhoto ?: () => void,
    onPreviousPhoto ?: () => void,
    block ?: boolean
}

export const Timer = ({onNextPhoto, onPreviousPhoto, onTimerReset, onTimerIsZero, block = false} : TimerProps) => {
    const {
        inputRef,
        timerValue,
        handleKeyDown,
        handleTimerValueChange
    } = useTimerInput();

    const {
        defaultInterval,
        handleEdit,
        handleSave,
        handlePlayPause,
        handleReset,
        handleBlock,
        isPaused,
        isEditing,
        formatSecondsToTime
    } = useTimer(10, handleTimerValueChange, onTimerReset, onTimerIsZero);

    useEffect(()=>{
        handleBlock(block);
    },[block])

    const handleNextPhoto = () => {
        if(onNextPhoto) {
            onNextPhoto();
            handleReset();
        }
    }

    const handlePreviousPhoto = () => {
        if(onPreviousPhoto) {
            onPreviousPhoto();
            handleReset();
        }
    }

    return (
        <ControlsDiv>
            <Divider/>
            <TimerTile>
                {isEditing ? (
                        <ControlButton onClick={() => handleSave(timerValue)}>
                            <SaveIcon/>
                        </ControlButton>
                    ) : (
                        <ControlButton onClick={() => handleEdit()}>
                            <EditIcon/>
                        </ControlButton>
                    )
                }
                <TimerInput 
                    ref={inputRef}
                    value={timerValue} 
                    disabled={!isEditing}
                    onKeyDown={handleKeyDown}
                    $isEditing={isEditing}
                />

                {isEditing ? (
                    <ControlButton onClick={() => handleEdit({cancel:true})}>
                        <CloseIcon/>
                    </ControlButton>
                ):(
                    <ControlButton onClick={handleReset}>
                        <RestartAltIcon/>
                    </ControlButton>
                )}
            </TimerTile>
            <IntervalLimit>{`${formatSecondsToTime(defaultInterval)}`}</IntervalLimit>
            <PlayerTile>
                <ControlButton onClick={handlePreviousPhoto}>
                    <SkipPreviousIcon/>
                </ControlButton>

                <ControlButton $play={true} $paused={isPaused} onClick={() => handlePlayPause(timerValue)}>
                    {isPaused ? (<PlayArrowIcon/>):(<PauseIcon/>)}
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

const IntervalLimit = styled.div`
display: block;
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 16px;
    font-weight: 100;
    color:#818181;
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
    margin: 0 4px;

    &:active {
        background-color: #c3c3c3;
        border-radius: 50%;
    }

    ${props => props.$play && "color: white; border-radius: 50%;"}
    ${props => props.$paused ? "background-color: #00c468;" : (props.$play ? "background-color: #fc0000;" : "")}
`

const TimerInput = styled.input<{$isEditing?:boolean}>`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 35px;
    background-color: white;
    height: 50px;
    width: 110px;
    padding: 0 10px;
    border: none;
    border-radius: 10px;
    color : ${props => props.$isEditing ? "#00c468" : "black"};

    &:disabled {
        color: black;
    }
`