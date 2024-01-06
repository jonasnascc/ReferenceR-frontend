import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";

type PhotosTableProps = {
    album : any;
}

export const PhotosTable = ({album} : PhotosTableProps) => {
    const [data, setData] = useState<any[]>([])

    useEffect(()=>{
        fetch("http://localhost:8080/api/author/thomasphotoworks/albums/73420746/photos?provider=deviantart&page=1&limit=60", {
            body: JSON.stringify({username:"yonnasz", password:"joninhas2210"}),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
        })
        .then((response) => response.json())
        .then((data) => setData(data))
    }, [album])

    return(
        <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
            {data.map((item) => (
                <ImageListItem key={item.img}>
                <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
        </ImageList>
    )
}