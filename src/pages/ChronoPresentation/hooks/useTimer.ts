import { useEffect, useState } from "react";


export const useTimer = (initialSecondsValue: number, onTimerReset?:() => void, onTimerIsZero?:() => void) => {
    const [seconds, setSeconds] = useState(initialSecondsValue)

    const [isZero, setIsZero] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [timerValue, setTimerValue] = useState("");

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
        setTimerValue(`${formatSecondsToTime(seconds)}`)
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

    const handlePlayPause = () => {
        setIsPaused((state) => !state);
    }

    const handleReset = () => {
        setSeconds(initialSecondsValue);
        if(onTimerReset) onTimerReset();
    }

    const handleBlock = (state:boolean) => {
        setIsBlocked(state);
    }

    const handleEdit = () => {
        const state = !isEditing;
        setIsEditing(state);
        setIsPaused(state);
    }

    const handleChange = (event:any) => {
        let inputValue = event.target.value;

        inputValue = inputValue.replace(/\D/g, '');

        inputValue = inputValue.substring(0, 4);

        if (inputValue.length > 1) {
            inputValue = inputValue.substring(0, 2) + ':' + inputValue.substring(2);
        }

        setTimerValue(inputValue);
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
        timerValue,
        handleEdit,
        handlePlayPause,
        handleReset,
        handleBlock,
        handleChange,
        isZero,
        isPaused,
        isEditing
    };
}