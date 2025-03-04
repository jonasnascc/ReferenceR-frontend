import React, { useState } from "react"
import { AlbumCarouselSlideItem, AlbumCarouselImage, AlbumCarouselItemDescription, DescriptionAlbumName, DescriptionAlbumSize, SlideItemPhoto } from "./styles"
import { Album, UserCollection } from "../../../model/album"
import { SimplePhoto } from "../../../model/photo"
import { useQuery } from "react-query"
import { fetchAlbumThumbnail } from "../../../api/services/Album"
import { getCollectionThumbnail } from "../../../api/services/Collection"

type AlbumsCarouselItemProps = {
    selected ?: boolean,
    album: Album | UserCollection,
    onSelect : () => void,
    isCollection ?:boolean
}
export const AlbumsCarouselItem = ({album, onSelect, isCollection=false, selected=false} : AlbumsCarouselItemProps) => {
    const [thumbnail, setThumbnail] = useState<SimplePhoto | null>(album.thumbnail)
    const [isHovering, setIsHovering] = useState(false)

    useQuery<SimplePhoto>([`album-${'code' in album ? album.code : album?.id??-1}|${'author' in album && album.author}-thumbnail`], () => fetchAlbumThumbnail(album.id), {
        enabled: !isCollection && album.id!==null && !Boolean(thumbnail),
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setThumbnail(data)
        }
    })

    useQuery<SimplePhoto>([`collection-${'code' in album ? album.code : album?.id??-1}|${'author' in album && album.author}-thumbnail`], () => getCollectionThumbnail(album.id), {
        enabled: isCollection && album.id!==null && !Boolean(thumbnail),
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setThumbnail(data)
        }
    })

    const handleHover = (state:boolean) => {
        setIsHovering(state)
    }

    return (
        <AlbumCarouselSlideItem 
            selected={selected}
            onClick={() => onSelect()}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            {thumbnail && (
                <SlideItemPhoto>
                    <AlbumCarouselImage
                        src={thumbnail?.url??thumbnail.thumbUrl}
                        alt={`slide-item#${album.name}`}
                    />
                </SlideItemPhoto>
            )}
            <AlbumCarouselItemDescription>
                {
                album.name==="All" || album.name==="Scraps" ? (
                    <DescriptionAlbumName>{'author' in album && (album.name !== "Scraps" ? album.author : `${album.author} - Scraps`)}</DescriptionAlbumName>
                    ) : (
                        <>
                        <DescriptionAlbumName>{album.name}</DescriptionAlbumName>
                        {/* <p>{album.author}</p> */}
                        </>
                    )}
                {}
                <DescriptionAlbumSize>{album.size ? `${album.size} photos` : ""}</DescriptionAlbumSize>
            </AlbumCarouselItemDescription>
        </AlbumCarouselSlideItem>
    )
}