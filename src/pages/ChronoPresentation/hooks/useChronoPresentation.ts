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

    const [isBuffering, setIsBuffering] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const loaded = history.length - 1 - currentHistoryIndex;
            if(loaded < 10) {
                if(!isLoading) {
                    setIsBuffering(true);
                    fetchRandomPhoto();
                }
            } else setIsBuffering(false);
        }, 500);

        return () => clearInterval(interval)
    }, [history, isLoading, currentHistoryIndex])


    useEffect(() => {
        handleChangeCurrentPhoto();
    }, [currentHistoryIndex])

    const handleChangeCurrentPhoto = (index ?: number) => {
        const photo = photosMap[history[index ? index : currentHistoryIndex]];
        if( photo !== undefined ) {
            setCurrentPhoto(photo);
        }
    }

    const fetchRandomPhoto = async () => {
        const randomPage = getRandomPhotoNumber();

        setIsLoading(true);
        await queryClient.fetchQuery(`album-photo-${randomPage}`, () => fetchAlbumPhotos(
            album,
            album?.author??null,
            album?.provider??"",
            randomPage,
            1
        )).then((data) => {
            if(data.length > 0) {
                photosMap[randomPage] = data[0];
                setHistory((hist) => [...hist, randomPage]);
            }
            setIsLoading(false);
            if(history.length === 1) {
                handleChangeCurrentPhoto(0);
            }
        });
    }
    

    const handleNextPhoto = () => {
        if(photosMap[history[currentHistoryIndex + 1]] !== undefined) {
            setCurrentHistoryIndex(currentHistoryIndex + 1);
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

    return {
        history,
        album,
        currentPhoto,
        currentHistoryIndex,
        handleNextPhoto,
        handlePreviousPhoto,
        isLoading,
        isBuffering
    };
}
