import React, { useState } from "react"
import { AlbumCarouselSlideItem, AlbumCarouselImage, AlbumCarouselItemDescription, DescriptionAlbumName, DescriptionAlbumSize } from "./styles"
import { Album } from "../../../model/album"
import { SimplePhoto } from "../../../model/photo"
import { useQuery } from "react-query"
import { fetchAlbumThumbnail } from "../../../api/services/Album"

type AlbumsCarouselItemProps = {
    selected ?: boolean,
    album: Album,
    onSelect : () => void
}
export const AlbumsCarouselItem = ({album, onSelect, selected=false} : AlbumsCarouselItemProps) => {
    const [thumbnail, setThumbnail] = useState<SimplePhoto | null>(album.thumbnail)

    useQuery<SimplePhoto>([`album-${album.code}|${album.author}-thumbnail`], () => fetchAlbumThumbnail(album.id), {
        enabled: album.id!==null && !Boolean(thumbnail),
        onSuccess: (data) => {
            setThumbnail(data)
        }
    })

    return (
        <AlbumCarouselSlideItem 
            selected={selected}
            onClick={() => onSelect()}
        >
            {thumbnail && (
                <AlbumCarouselImage
                    src={thumbnail.url}
                    alt={`slide-item#${album.name}`}
                />
            )}
            <AlbumCarouselItemDescription>
                <DescriptionAlbumName>{(album.name!=="All") ? (album.name !== "Scraps" ? album.name : `${album.author} - Scraps`) : album.author}</DescriptionAlbumName>
                <DescriptionAlbumSize>{`${album.size} photos`}</DescriptionAlbumSize>
            </AlbumCarouselItemDescription>
        </AlbumCarouselSlideItem>
    )
}