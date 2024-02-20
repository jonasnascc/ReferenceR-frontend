import { useEffect, useState } from "react";
import { Album } from "../../../types/album";
import { Deviation } from "../../../types/photo";
import { useQuery, useQueryClient } from "react-query";
import { fetchAlbumPhotos } from "../../../api/services/Photo";
import { clearTimeout } from "timers";

const photosMap : Record<number, Deviation|null> = {}

export const useChronoPresentation = (album : Album | null) => {
    const queryClient = useQueryClient();

    const [history, setHistory] = useState<number[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
    const [currentPhoto, setCurrentPhoto] = useState<Deviation|null>(null);

    const [bufferingIndex, setBufferingIndex] = useState<number>(0)
    const [isBuffering, setIsBuffering] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const {isLoading:loading, isFetching:fetching} = useQuery([`album-photo-${history[bufferingIndex]}`, isBuffering, history], () => fetchAlbumPhotos(
        album,
        album?.author??null,
        album?.provider??"",
        history[bufferingIndex],
        1
    ),{
        enabled: isBuffering,
        refetchOnWindowFocus : false,
        onSuccess: (data) => {
            
            if(history.length - 1 - currentHistoryIndex >= 5){
                setIsBuffering(false);
            } else {
                photosMap[history[bufferingIndex]] = data[0];
                if(bufferingIndex===0) setCurrentPhoto(photosMap[history[bufferingIndex]]);
                

                setHistory((hist) => [...hist, getRandomPhotoNumber()]);
                setBufferingIndex(history.length - 1);
                
            }
            if(isLoading && bufferingIndex === currentHistoryIndex) {
                setIsLoading(false);
                handleNextPhoto();
            }
        }
    })

    useEffect(() => {
        setHistory([getRandomPhotoNumber()])
        setBufferingIndex(0);
    }, [])

    useEffect(() => {
        if((history.length == 0 && bufferingIndex == 0)) {
            setIsBuffering(true);
        }
    }, [history, bufferingIndex, currentHistoryIndex])

    useEffect(() => {
        if(!isBuffering) {
            setIsLoading(loading || fetching);
        }
        console.log(history)
    }, [isBuffering, loading, fetching])

    useEffect(() => {
        setIsBuffering(true);
        console.log(currentHistoryIndex, history.length, photosMap[history[currentHistoryIndex]])
        if(photosMap[history[currentHistoryIndex]] !== undefined)
            setCurrentPhoto(photosMap[history[currentHistoryIndex]]);
    } , [currentHistoryIndex])

    const handleNextPhoto = () => {
        if(photosMap[history[currentHistoryIndex + 1]] !== undefined) {
            setCurrentHistoryIndex(currentHistoryIndex + 1);
        } else {
            console.log(photosMap);
            setIsLoading(true);
        }
    }

    const handlePreviousPhoto = () => {
        if(photosMap[history[currentHistoryIndex - 1]] !== undefined) {
            setCurrentHistoryIndex(currentHistoryIndex - 1);
        }
    }

    const getRandomPhotoNumber = () : number => {
        let num = generateRandomNumber();

        while(history.includes(num)) {
            num = generateRandomNumber();
        }

        return num;
    }

    const generateRandomNumber = () => {
        const min = 1;
        const max = album?.size??1;
    
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadBuffer = () => {
        const nums : number[] = [];
        for(let i=0; i<3; i++){
            const num = getRandomPhotoNumber();
            nums.push(num);
        }
        setHistory([...history, ...nums]);
    }

    return {
        history,
        album,
        currentPhoto,
        currentHistoryIndex,
        handleNextPhoto,
        handlePreviousPhoto,
        isLoading
    };
}
