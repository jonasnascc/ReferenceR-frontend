import { useEffect, useState } from "react";


export const useTimer = (initialSecondsValue: number, onTimerReset?:() => void) => {
    const [seconds, setSeconds] = useState(initialSecondsValue)

    const [isZero, setIsZero] = useState(false);
    const [isPaused, setIsPaused] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            handleDecreaseSeconds();
          }, 1000);
        return () => clearInterval(interval);
    }, [isZero, isPaused])

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
        if((seconds >= -1) && !isPaused) {
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

    return {
        seconds,
        formatSecondsToTime,
        handlePlayPause,
        handleReset,
        isZero,
        isPaused
    };
}