import React, { useEffect } from "react";
import { OutlinedButton } from "../../../../shared/components/Buttons/styles";
import { useTimer } from "../../../../shared/hooks/presentation/useTimer";
import { useTimerInput } from "../../../../shared/hooks/presentation/useTimerInput";
import { EditTile, Timer, TimerInputBase } from "./styles";

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

type TimerInputProps = {
    pause : boolean,
    blockTimer: boolean, 
    startFrom ?: number,
    reset?: boolean,
    onNextPhoto : () => void,
    onPreviousPhoto : () => void,
    onSecondsChange ?: (max: number, progress:number) => void,
    onReseted ?: () => void
}

export const TimerInput = ({pause, blockTimer, startFrom, reset=false, onNextPhoto, onPreviousPhoto, onSecondsChange, onReseted=()=>{}} : TimerInputProps) => {
    const {
        inputRef,
        timerValue,
        handleKeyDown,
        handleChange,
        handleTimerValueChange
    } = useTimerInput()

    const {
        seconds,
        defaultInterval,
        handleEdit,
        handleSave,
        handlePlayPause,
        handleBlock,
        handleReset,
        isEditing,
    } = useTimer(10, handleTimerValueChange, undefined, undefined, startFrom)
    
    useEffect(()=>{
        handleBlock(blockTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blockTimer])

    useEffect(() => {
        handlePlayPause(timerValue, pause)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pause])

    useEffect(() => {
        handleReset()
        onReseted()
    }, [reset])

    useEffect(() => {
        if(onSecondsChange) onSecondsChange(defaultInterval, seconds)
    }, [seconds])

    const handleEditTimer = () => {
        if(isEditing) handleSave(timerValue)
        else handleEdit()
    }

    return (
        <Timer>
            <TimerInputBase
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={timerValue}
                disabled={!isEditing}
            />
            <EditTile onClick={handleEditTimer} color={isEditing?"black":"white"}>
                {isEditing ? <SaveIcon/> : <EditIcon/>}
            </EditTile>
        </Timer>
    )
}