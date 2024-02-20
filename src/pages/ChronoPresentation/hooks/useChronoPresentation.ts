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
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-2);
    const [currentPhoto, setCurrentPhoto] = useState<Deviation|null>(null);

    const [bufferingIndex, setBufferingIndex] = useState<number>(0)
    const [isBuffering, setIsBuffering] = useState(false);

    const {isLoading, isFetching} = useQuery([`album-photo-${history[currentHistoryIndex]}`, currentHistoryIndex], () => fetchAlbumPhotos(
        album,
        album?.author??null,
        album?.provider??"",
        history[currentHistoryIndex],
        1
    ),{
        enabled: photosMap[history[currentHistoryIndex]] === undefined,
        refetchOnWindowFocus : false,
        onSuccess: (data) => {
            if(data.length > 0) {
                photosMap[history[isBuffering ? bufferingIndex : currentHistoryIndex]] = data[0];
                if(isBuffering) setIsBuffering(false);
                else setCurrentPhoto(data[0]);
            }
        }
    })

    useEffect(() => {
        handleNextPhoto();
    }, [])

    const handleNextPhoto = () => {
        const emptyHistory = history.length == 0;
        const indexIsTheLast = history.length-1 === currentHistoryIndex;

        let newIndex = 0;
        if(emptyHistory || indexIsTheLast) {
            const num = getRandomPhotoNumber();
            setHistory([...history, num]);
            newIndex = emptyHistory ? 0 : (currentHistoryIndex + 1);
        } else{
            newIndex = currentHistoryIndex + 1;
            setCurrentPhoto(photosMap[history[currentHistoryIndex + 1]]);
        }
        setCurrentHistoryIndex(newIndex);
    }

    const handlePreviousPhoto = () => {
        if(photosMap[history[currentHistoryIndex - 1]] !== undefined) {
            setCurrentHistoryIndex(currentHistoryIndex - 1);
            setCurrentPhoto(photosMap[history[currentHistoryIndex - 1]]);
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
        isLoading,
        isFetching
    };
}
