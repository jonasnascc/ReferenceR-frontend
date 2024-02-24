import { useEffect, useRef, useState } from "react";


export const useTimer = (initialSecondsValue: number, onSecondsChange: (value: string) => void, onTimerReset?:() => void, onTimerIsZero?:() => void) => {
    const [defaultInterval, setDefaultInterval] = useState(initialSecondsValue);
    const [seconds, setSeconds] = useState(initialSecondsValue)
    const [isZero, setIsZero] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            handleDecreaseSeconds();
          }, 1000);
        return () => clearInterval(interval);
    }, [isZero, isPaused, isBlocked, isEditing])

    useEffect(() => {
        handleSeconds()
    }, [seconds])
    
    const handleSeconds = () => {
        onSecondsChange(formatSecondsToTime(seconds))
        if(seconds == 0) {
            setIsZero(true);
            if(onTimerIsZero) onTimerIsZero();
        } else setIsZero(false);

        if(seconds == -1) {
            if(!isPaused) {
                handleReset();
            }
        }
    }

    const handleDecreaseSeconds = () => {
        if((seconds >= -1) && !isPaused && !isBlocked && !isEditing) {
            setSeconds((prevSeconds) => prevSeconds-1);
        }
    }

    const handlePlayPause = (timerValue:string) => {
        const newState = !isPaused;
        setIsPaused(() => newState);
        if(isEditing) {
            handleSave(timerValue, true);
        }

    }

    const handleReset = () => {
        setSeconds(defaultInterval);
        if(onTimerReset) onTimerReset();
    }

    const handleBlock = (state:boolean) => {
        setIsBlocked(state);
    }

    const handleEdit = (args ?: {cancel:boolean}) => {
        const stop = args ? args.cancel : false;

        console.log(stop)
        setIsEditing(!stop);
        setIsPaused(!stop);
        if(!stop)
            onSecondsChange(formatSecondsToTime(defaultInterval));
    }

    const handleSave = (timerValue : string, preserveSecs ?: boolean) => {
        const secs =  convertTimerValueToSeconds(timerValue);

        if(secs !== 0) {
            setDefaultInterval(secs);
            if(!preserveSecs) setSeconds(secs);
        }

        setIsEditing(false);
        setIsPaused(false);
    }

    const convertTimerValueToSeconds = (value: string) => {
        const times = value.split(":");
        const minutes = Number(times[0]) * 60;
        return  minutes + Number(times[1]);
    }
    
    const formatSecondsToTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return {
        seconds,
        handleEdit,
        handleSave,
        handlePlayPause,
        handleReset,
        handleBlock,
        isZero,
        isPaused,
        isEditing,
        convertTimerValueToSeconds
    };
}