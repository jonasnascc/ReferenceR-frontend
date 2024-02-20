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

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleNextPhoto();
    }, [])

    useEffect(() => {
        if(history.length > 0 || history.length-1 === currentHistoryIndex) {
            fetchPhoto(currentHistoryIndex);
        }
    }, [history])

    const fetchPhoto = async (index : number) => {
        setLoading(true);
        await queryClient.fetchQuery("album-photo", () => fetchAlbumPhotos(
            album,
            album?.author??null,
            album?.provider??"",
            history[index],
            1
        )).then((data) => {
            if(data.length > 0) {
                setCurrentPhoto(data[0]);
                photosMap[history[index]] = data[0];
            }
            setLoading(false);
        });
    }

    const handleNextPhoto = () => {
        const emptyHistory = history.length == 0;
        const indexIsTheLast = history.length-1 === currentHistoryIndex;

        if(emptyHistory || indexIsTheLast) {
            const num = getRandomPhotoNumber();
            setHistory([...history, num]);
            setCurrentHistoryIndex((index) => emptyHistory ? 0 : (index + 1));
        } else{
            const newIndex = currentHistoryIndex + 1;
            setCurrentHistoryIndex(newIndex);
            setCurrentPhoto(photosMap[history[newIndex]])
        }
        loadBuffer();
    }

    const handlePreviousPhoto = () => {
        if(history[currentHistoryIndex - 1] !== undefined) {
            setCurrentHistoryIndex(currentHistoryIndex - 1);
            setCurrentPhoto(photosMap[history[currentHistoryIndex - 1]]);
        }
    }

    const getRandomPhotoNumber = () : number => {
        let num = generateRandomNumber();

        let run = true;
        while(run) {
            if(!history.includes(num)) {
                setHistory([...history, num]);
                run = false;
            } else num = generateRandomNumber();
        }

        return num;
    }

    const generateRandomNumber = () => {
        const min = 1;
        const max = album?.size??1;
    
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadBuffer = () => {
        if((history.length - currentHistoryIndex) > 3) {
            console.log("buffering...")
        }
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
