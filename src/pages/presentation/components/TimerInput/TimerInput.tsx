import React, { useEffect } from "react";
import { OutlinedButton } from "../../../../shared/components/Buttons/styles";
import { useTimer } from "../../../../shared/hooks/presentation/useTimer";
import { useTimerInput } from "../../../../shared/hooks/presentation/useTimerInput";
import { EditTile, Timer, TimerInputArea, TimerInputBase } from "./styles";

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

type TimerInputProps = {
    pause : boolean,
    blockTimer: boolean, 
    onNextPhoto : () => void,
    onPreviousPhoto : () => void,
    onSecondsChange ?: (max: number, progress:number) => void
}

export const TimerInput = ({pause, blockTimer, onNextPhoto, onPreviousPhoto, onSecondsChange} : TimerInputProps) => {
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
        isEditing,
    } = useTimer(10, handleTimerValueChange, () => {}, onNextPhoto)
    
    useEffect(()=>{
        handleBlock(blockTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blockTimer])

    useEffect(() => {
        handlePlayPause(timerValue, pause)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pause])

    useEffect(() => {
        if(onSecondsChange) onSecondsChange(defaultInterval, seconds)
    }, [seconds])

    const handleEditTimer = () => {
        if(isEditing) handleSave(timerValue)
        else handleEdit()
    }

    return (
        <TimerInputArea>
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
        </TimerInputArea>
    )
}