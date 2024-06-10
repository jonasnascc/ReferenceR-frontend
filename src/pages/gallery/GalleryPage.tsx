import React, { useState } from "react"
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import { fetchAuthorAlbums } from "../../api/services/Album";
import { Album } from "../../model/album";
import { fetchAlbumPhotos } from "../../api/services/Photo";
import { SimplePhoto } from "../../model/photo";

export const GalleryPage = () => {
    const queryClient = useQueryClient();
    const {authorName} = useParams()
    const navigate = useNavigate();
    const [albums, setAlbums] = useState<Album[]>()
    const [selectedAlbum, setSelectedAlbum] = useState<number>(0)
    const [photos, setPhotos] = useState<SimplePhoto[]>([])
    const [page, setPage] = useState(1)

    useQuery<Album[]>(["albums"], () => fetchAuthorAlbums(authorName??"", "deviantart"), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 3,
        onSuccess: (data) => {
            setAlbums(data)
        }
    })

    const seePhotosQuery = (album:Album, authorName:string, pg:number) => queryClient.fetchQuery([`album-${album.code}-photos`], () => fetchAlbumPhotos(
        album,
        authorName,
        "deviantart",
        pg,
        30
    )).then((data) => {
        if(data) setPhotos(data)
        else setPhotos([])
    }).catch((err) => setPhotos([]))

    const handleAlbumClick = (index : number) => {
        setSelectedAlbum(index)
    }

    const getAlbumByIndex = (index:number) => {
        if(albums) return albums[index]
        else return null;
    }

    const handleSeePhotosClick = (album : Album) => {
        if(!authorName) return;

        seePhotosQuery(album, authorName, 1)
    }

    if(!authorName) {
        navigate("/");
        return (null);
    }
    else return (
        <div>
            <h1>{authorName}'s gallery</h1>
            <ol>
                {albums&&albums.map((album, index) => (
                    <li key={index}><a href="#" onClick={() => handleAlbumClick(index)}>{album.name}</a></li>
                ))}
            </ol>
            <hr/>
            {
                albums&&albums.filter(alb => alb.code === getAlbumByIndex(selectedAlbum)?.code??"").map((alb,index) => (
                    <div key={index}>
                        <img src={alb.thumbnail.url} alt={alb.thumbnail.title} style={{width: "auto", height: "200px"}}/>
                        <h2>{alb.name}</h2>
                        <p>{`${alb.size} photos`}</p>
                        <button onClick={() => handleSeePhotosClick(alb)}>See photos</button>
                        <hr/>
                    </div>
                ))
            }
            <div
                style={{
                    display:"flex",
                    flexWrap:"wrap",
                    gap:"10px",
            }}>
            {
                photos.length > 0 && photos.map((photo, index) => (
                    <img 
                        key={index} 
                        src={photo.url} 
                        alt={photo.title}
                        style={{
                            height:"250px",
                            width: "auto",
                            objectFit: "cover"
                        }}
                    />
                ))
            }
            </div>

            
        </div>
    )
}