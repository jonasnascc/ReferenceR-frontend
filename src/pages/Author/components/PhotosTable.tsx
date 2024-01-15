import { ImageList, ImageListItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Deviation } from "../../../types/photo";
import { ThumbnailContainer } from "./ThumbnailContainer";
import { SearchContext } from "../../../context/Search/SearchContext";
import { Album } from "../../../types/album";

type PhotosTableProps = {
    album : Album;
}

export const PhotosTable = ({album} : PhotosTableProps) => {
    const {author, provider} = useContext(SearchContext);
    const [data, setData] = useState<Deviation[]>([])

    useEffect(()=>{
        const mounted = true;

        const fetchPhotos = async () => {
            await axios.get(`author/${author}/albums/${album.code.replace(`deviantart-${author}`, "all").replace("deviantart-", "")}/photos?provider=${provider}&page=1&limit=60`, {
                sendToken : true
            })
                .then((response) => setData(response.data))
                .catch((err) => console.log(err));
        }

        if(mounted && author !== null && provider !== null)
            fetchPhotos();
    }, [album])


    return(
        <ImageList cols={5} sx={{ width: "100%", height: "100%", overflow:"hidden" }} variant="quilted" gap={10}> 
            {data.map((deviation) => {
                return (
                    <ImageListItem key={deviation.id}>
                        <ThumbnailContainer url={deviation.url} title={deviation.title}/>
                    </ImageListItem>
                )
            })}
        </ImageList>
    )
}