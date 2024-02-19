import { useEffect, useState } from "react";


export const useTimer = (initialSecondsValue: number, onTimerReset?:() => void) => {
    const [seconds, setSeconds] = useState(initialSecondsValue)

    const [isZero, setIsZero] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            handleDecreaseSeconds();
          }, 1000);
        return () => clearInterval(interval);
    }, [isZero, isPaused, isBlocked])

    useEffect(() => {
        handleSeconds()
    }, [seconds])
    
    const handleSeconds = () => {
        if(seconds == 0) {
            setIsZero(true);
        } else setIsZero(false);

        if(seconds == -1) {
            if(!isPaused) {
                handleReset();
            }
        }
    }

    const handleDecreaseSeconds = () => {
        if((seconds >= -1) && !isPaused && !isBlocked) {
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

    const formatSecondsToTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handleBlock = (state:boolean) => {
        setIsBlocked(state);
    }

    return {
        seconds,
        formatSecondsToTime,
        handlePlayPause,
        handleReset,
        handleBlock,
        isZero,
        isPaused
    };
}