import React, { useEffect, useState } from "react";
import { OutlinedButton } from "../../../../shared/components/Buttons/styles";
import { useTimer } from "../../../../shared/hooks/presentation/useTimer";
import { useTimerInput } from "../../../../shared/hooks/presentation/useTimerInput";

export type ControlPanelProps = {
    onNextPhoto : () => void,
    onPreviousPhoto: () => void,
    onBlockTimer : (value:boolean) => void,
    blockTimer: boolean
}

export const ControlPanel = ({blockTimer, onNextPhoto, onPreviousPhoto, onBlockTimer} : ControlPanelProps) => {
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
        handleReset,
        handleBlock,
        isPaused,
        isEditing,
    } = useTimer(10, handleTimerValueChange, onNextPhoto)

    useEffect(()=>{
        handleBlock(blockTimer);
    },[blockTimer])

    const handleNext = () => {
        onBlockTimer(true)
        onNextPhoto()
        handleReset()
    }
    const handlePrevious = () => {
        onPreviousPhoto()
        handleReset()
    }
    
    return (
        <>
        <div style={{color: "white"}}>
            <input 
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={timerValue}
                disabled={!isEditing}
            />
            {
                isEditing ? (
                    <OutlinedButton color="white" onClick={() => handleSave(timerValue)}>Save</OutlinedButton>
                ) : (
                    <OutlinedButton color="white" onClick={() => handleEdit()}>Edit</OutlinedButton>
                )
            }
            <OutlinedButton color="white" onClick={() => handlePlayPause(timerValue)}>{isPaused ? "Start" : "Pause"}</OutlinedButton>
        </div>
        <div>
            <OutlinedButton color="white" onClick={handlePrevious} >previous</OutlinedButton>
            <OutlinedButton color="white" onClick={handleNext} >next</OutlinedButton>
        </div>
        </>
    )
}