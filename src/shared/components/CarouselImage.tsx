import React, { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Album } from "../../types/album";
import { useQuery } from "react-query";
import { fetchAlbumThumbnail } from "../../api/services/Album";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

export const CarouselImage = ({ album, hideIfMature }: { album: Album; hideIfMature: boolean }) => {

    const [url, setUrl] = useState(album.thumbnail?.url ?? "");
    const [error, setError] = useState(false);
    const [isMature, setIsMature] = useState(album.thumbnail?.mature ?? false);
    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: loading, isFetching: fetching } = useQuery(`album-${album.id}-thumbnail-url`, () => fetchAlbumThumbnail(album.id), {
        enabled: url === "",
        refetchOnWindowFocus: false,
        onSuccess: (resp) => {
            setUrl(resp.url);
            setIsMature(resp?.mature ?? true);
        }
    });

    const handleError = () => {
        setError(false);
    };

    const handleLoad = (state: boolean) => {
        setIsLoading(state);
    };

    return (
        <>
            {(fetching || isLoading || error || loading) ?
                (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : (
                    hideIfMature && isMature ?
                        (
                            <HiddenContent>
                                <VisibilityOffIcon />
                            </HiddenContent>
                        ) : (
                            <ThumbImage src={url} alt={album.name} onError={handleError} onLoadStart={() => handleLoad(true)} onLoadedData={() => handleLoad(false)} />
                        )
                )}
        </>

    );
};

const HiddenContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 15%;
    height: 100%;
    width: 100%;
    background-color:#dfdfdf;
    color: #818181;
`
const ThumbImage = styled.img`
    text-decoration : none;
    object-fit: cover;
    width: 100%;
    height: 100%;
`