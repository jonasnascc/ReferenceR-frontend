import { useEffect, useState } from "react";
import { Album } from "../../../types/album";
import { Deviation } from "../../../types/photo";
import { useQuery, useQueryClient } from "react-query";
import { fetchAlbumPhotos } from "../../../api/services/Photo";

export const useChronoPresentation = (album : Album | null) => {
    const queryClient = useQueryClient();

    const [history, setHistory] = useState<number[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState<Deviation|null>(null);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleNextPhoto();
    }, [])

    useEffect(() => {
        if(history.length > 0) {
            fetchNextPhoto();
        }
    }, [history, currentHistoryIndex])

    const fetchNextPhoto = async () => {
        setLoading(true);
        await queryClient.fetchQuery("album-photo", () => fetchAlbumPhotos(
            album,
            album?.author??null,
            album?.provider??"",
            history[history.length-1],
            1
        )).then((data) => {
            setLoading(false);
            if(data.length > 0) {
                setCurrentPhoto(data[0]);
            }
        });
    }

    const handleNextPhoto = () => {
        let num = generateRandomNumber();

        let run = true;
        while(run) {
            if(!history.includes(num)) {
                setHistory([...history, num]);
                run = false;
            } else num = generateRandomNumber();
        }

        setHistory([...history, num]);
        setCurrentHistoryIndex((index) => index + 1);
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
        isLoading
    };
}