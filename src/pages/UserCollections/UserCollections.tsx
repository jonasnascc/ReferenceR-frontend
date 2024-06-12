import React from "react";
import { useQuery } from "react-query";
import { fetchFavoritedAlbums } from "../../api/services/Album";
import { Album } from "../../model/album";

export const UserCollectionsPage = () => {
    const req = useQuery<Album[]>(["user-collections"], () => fetchFavoritedAlbums())

    const albums = req?.data??[]
    return (
        <>
        <h1>User Collections</h1>
        {
            albums&&albums.map((alb,index) => (
                <div key={index}>
                    {/* <img src={alb.thumbnail.url} alt={alb.thumbnail.title} style={{width: "auto", height: "200px"}}/> */}
                    <h2>{alb.name}</h2>
                    <p>{alb.author}</p>
                    <p>{`${alb.size} photos`}</p>
                    <hr/>
                </div>
            ))
        }
        </>
    )
}