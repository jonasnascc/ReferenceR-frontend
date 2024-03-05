import React, { useEffect, useRef, useState } from "react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Album } from "../../../types/album";
import { FavoriteStar } from "../FavoriteStar";
import { CarouselImage } from "../CarouselImage";
import { Carousel, ArrowButtonContainer, ArrowButton, ItemsList, Item, Thumbnail, Star, AlbumThumb, ThumbLabel, LabelText, SliderDiv, AlbumLabelDiv } from "./styles";

const MOVE_CONSTANT = 210;

type AlbumsCarouselProps = {
    albums : Album[],
    onSelect : (album : Album) => void,
    selectedAlbum : Album | null,
    fullView ?: boolean,
    idAsidentifier ?: boolean,
    hideMatureThumbnail ?: boolean
}

export const AlbumsCarousel = ({albums, onSelect, selectedAlbum, hideMatureThumbnail = true, fullView=false, idAsidentifier=false} : AlbumsCarouselProps) =>{
    const [data, setData] = useState<Album[]>([]);
    const listRef = useRef<HTMLUListElement>(null);
    const [selected, setSelected] = useState(0);

    const [hideMature, setHideMature] = useState(hideMatureThumbnail);
    
    useEffect(() => {
        const storedValue = localStorage.getItem("mature");

        if (storedValue) {
            const parsedValue = JSON.parse(storedValue);
            if (typeof parsedValue === 'boolean') 
                setHideMature(!parsedValue);
        }
    },[])

    useEffect(() => {
        if(albums.length > 0) {
            const middle = ~~(albums.length/2)
            const leftSide = albums.slice(0, middle + 1);
            const rightSide = albums.slice(middle + 1, albums.length); // 0 1 2 3 4 5 6 7
            setData(() => [...rightSide, ...leftSide])
            setSelected(middle);
            
        }
    }, [albums])

    useEffect(() => {
        if(listRef.current) {
            moveCenter()
        }
    }, [listRef.current?.scrollWidth])

    const isAlbumSelected = (album : Album) => {
        if(selectedAlbum) {
            if(idAsidentifier) return selectedAlbum.id === album.id;
            return selectedAlbum.code === album.code;
        }
            
        return false;
    }

    const moveCenter = (settings ?: {smooth:boolean}) => {
        const ref : any = listRef.current;
        if(ref) {
            ref.scrollTo({
                left: (ref.scrollWidth - ref.clientWidth)/2,
                behavior: settings ? (settings.smooth ? "smooth" : "auto") : "auto"
            });
        }
    }

    const moveLeft = () => {
        setData(list => [list[list.length-1], ...list.slice(0, list.length-1)]);
        const ref : any = listRef.current;
        if(ref) {
            ref.scrollTo({
                left: ref.scrollLeft + MOVE_CONSTANT
            });
            moveCenter({smooth: true});
        }
    }
    const moveRight = () => {
        setData(list => [...list.slice(1, list.length), list[0]]);
        const ref : any = listRef.current;
        if(ref) {
            ref.scrollTo({
                left: ref.scrollLeft - MOVE_CONSTANT
            });
            moveCenter({smooth: true});
        }
    }

    return (
        <Carousel $fullView={fullView}>
            <ArrowButtonContainer $position={"left"} onClick={moveLeft}>
                <ArrowButton>
                    <ArrowBackIosIcon/>
                </ArrowButton>
            </ArrowButtonContainer>
                
            <ItemsList ref={listRef} $fullView={fullView}>
                
                {
                    data.map((album, index) => (
                        <Item key={album.code}>
                            <Thumbnail onClick={() => onSelect(album)} $size={getThumbSize(index, selected)}>
                                <Star>
                                    <FavoriteStar 
                                        album={album}
                                    />
                                </Star>
                                <AlbumThumb $selected={selected === index}>
                                    <CarouselImage album={album} hideIfMature={hideMature}/>
                                </AlbumThumb>
                            </Thumbnail>
                        </Item>
                        
                    ))
                }
            </ItemsList>

            <ArrowButtonContainer $position={"right"} onClick={moveRight}>
                <ArrowButton><ArrowForwardIosIcon/></ArrowButton>
            </ArrowButtonContainer>   
        </Carousel>
    )
}


const getThumbSize = (index:number, selected: number) : number => {
    const max = 210;
    if(selected === index) return 210;

    return max - (Math.abs(selected - index) * 20);
}

// const formatAlbumLabel = (album : Album) : string => {
//     let label = album.name;

//     if(album.code === "all" || album.code === "scraps" || album.name.toLocaleLowerCase() === "featured") {
//         label = `${album.name} - ${album.author}`;
//     }

//     if(label.length >= 44)
//         return label.substring(0, 43) + "...";
//     else return label;
// }

