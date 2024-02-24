import { useEffect, useRef, useState } from "react";


export const useTimerInput = () => {
    const [timerValue, setTimerValue] = useState("00:00");
    
    const [currentSelectionPos, setCurrentSelectionPos] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.setSelectionRange(currentSelectionPos, currentSelectionPos);
        }
    }, [timerValue])

    const handleTimerValueChange = (value : string) =>{
        setTimerValue(value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (inputRef.current) {
            let currentPosition = inputRef.current.selectionStart || 0;
            setCurrentSelectionPos(currentPosition);

            if (event.key === 'ArrowRight') {
                if(currentPosition == 2) currentPosition += 1;
                inputRef.current.setSelectionRange(currentPosition + 1, currentPosition + 1);
            } else if (event.key === 'ArrowLeft') {
                if(currentPosition == 4) currentPosition -= 1;
                inputRef.current.setSelectionRange(currentPosition - 1, currentPosition - 1);
            } else if (event.key === 'Backspace') {
                setTimerValue((value) => replaceTimerValueCharInPosition(value, currentPosition - 1, "0"));
                setCurrentSelectionPos((pos) => pos - (pos==4 ? 2 : 1));
                inputRef.current.setSelectionRange(currentPosition - 1, currentPosition - 1);
            } else if(/^\d+$/.test(event.key)){
                if(currentPosition == 2) currentPosition += 1;
                setCurrentSelectionPos(currentPosition + 1);
                setTimerValue((value) => replaceTimerValueCharInPosition(value, currentPosition, event.key));
                
                inputRef.current.setSelectionRange(currentPosition + 1, currentPosition + 1);
            }
        }
    };


    function replaceTimerValueCharInPosition(str: string, position : number, newCaracter : string) {
        if (position < 0 || position >= str.length) {
          return str;
        }
        const charArray = str.split('');
        if(charArray[position] === ":") return str;
        charArray[position] = newCaracter;

        const newString = charArray.join('');
      
        return newString;
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

    return {
        inputRef,
        timerValue,
        handleKeyDown,
        handleChange,
        handleTimerValueChange
    }

}