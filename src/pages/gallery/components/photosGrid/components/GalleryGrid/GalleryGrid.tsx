import { RefObject, useEffect, useRef, useState } from "react"
import { Deviation } from "../../../../../../model/photo"
import { GalleryGridColumn, GalleryGridContainer, GalleryGridImage, GalleryGridImageBlock } from "./styles"
import { setRef } from "@mui/material"
import { PhotoMoreButton } from "../PhotoMoreButton/PhotoMoreButton"
import { Album, UserCollection } from "../../../../../../model/album"



type ColumnPhotosProps = {
    photos : Deviation[],
    album?:Album | UserCollection,
    width: string,
    checkPhotoSelectedFn?:(photo : Deviation) => boolean, 
    onClick?:(photo : Deviation) => void, 
    onDoubleClick?:(photo : Deviation) => void,
    checkPhotoIsPresenting?:(photo:Deviation)=>boolean
    onDeletePhotos ?: (photos : Deviation[]) => void
}

type GridColumnsProps= {
    columns:Deviation[][]
} & Omit<ColumnPhotosProps, 'width'>

type GalleryGridProps = {
    photos : Deviation[],
    cols : number
} & Omit<ColumnPhotosProps, 'width'>

export const GalleryGrid = (props : GalleryGridProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [colsNumber, setColsNumber] = useState(props.cols)
    const [width, setWidth] = useState<number>();

    

    useEffect(() => {
        const handleUpdateCols = (width : number) => {
            if(width < 480) {
                setColsNumber(() => 1)
            }
            else if(width < 768) {
                setColsNumber(() => 2)
            }
            else if(width < 1279) {
                setColsNumber(() => 4)
            }
            else setColsNumber(props.cols)
        }
        
        if(width) handleUpdateCols(width+47)
    }, [width])

    useEffect(() => {
        if(!ref.current) return;
        const refDiv = ref.current

        const updateWidth = (refDiv : HTMLDivElement) => {
            if(refDiv) {
                setWidth(refDiv.offsetWidth)
            }
        }

        updateWidth(refDiv)

        window.addEventListener('resize', () => updateWidth(refDiv))        

        return () => {
            window.removeEventListener('resize', () => updateWidth(refDiv))  
        }
    }, [ref])

    return(
        <div ref={ref}>
            <GalleryGridImpl {...props} cols={colsNumber}/>
        </div>
    )
}

const GalleryGridImpl = (props : GalleryGridProps) => {
    const {
        photos,
        cols
    } = props

    const [data, setData] = useState<Deviation[]>([])

    const [columns, setColumns] = useState<Deviation[][]>([])

    useEffect(() => {
        setData(photos)
    }, [photos])
    
    useEffect(()=> {
        if(data.length === 0) return;

        const array = [...data]
        const colmns : Deviation[][] = []
        
        let index = 0;
        while(array.length !== 0) {
            while(index >= colmns.length) {
                colmns.push([])
            }

            const photo = array.shift();
            if(!photo) break;

            colmns[index].push(photo)

            index++;

            if(index === cols) {
                index = 0;
            }
        }
        setColumns(() => colmns)
    }, [cols, data])


    return(
        <GalleryGridContainer>
            <GridColumns columns={columns} {...props}></GridColumns>
        </GalleryGridContainer>
    )
}


const GridColumns = (props : GridColumnsProps) => {
    const {columns} = props
    return(
        <>
        {
            columns.length>0&&columns.map((colPhotos, colIndex) => (
                <GalleryGridColumn key={colIndex}>
                    <ColumnPhotos {...props} photos={colPhotos} width={`${Math.ceil(100/columns.length)}vw`}/>
                </GalleryGridColumn>
            ))
        }
    </>
    )
}



const ColumnPhotos = (props : ColumnPhotosProps) => {
    const {
        photos, 
        width,
        album,
        onDeletePhotos
    } = props

    return(
        <>
        {
            photos.map((photo, index) => (
                <GalleryGridImageBlock key={index} maxWidth={width}>
                    <PhotoMoreButton photo={photo} album={album} onDeletePhotos={onDeletePhotos}/>
                    <GridImage {...props} photo={photo}/>
                </GalleryGridImageBlock>
            ))
        }
        </>
    )
}

type GridImageProps = {
    photo:Deviation
}&Omit<ColumnPhotosProps,"width" | "photos">

const GridImage = ({photo, checkPhotoSelectedFn=() => false, checkPhotoIsPresenting=()=>false, onClick=()=>{}, onDoubleClick=()=>{}} : GridImageProps) => {
    const ref = useRef<HTMLImageElement>(null)

    const isElementInViewport = (element: HTMLElement | null) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
      };

    const handleCheckPresenting = () => {
        const presenting  = checkPhotoIsPresenting(photo)

        if(ref.current && presenting && !isElementInViewport(ref.current)) {
            
            ref.current.scrollIntoView({behavior:'smooth'})
        }

        return presenting
    }
   
    return (
        <GalleryGridImage
            ref={ref}
            selected={checkPhotoSelectedFn(photo)}
            presenting={handleCheckPresenting()}
            src={photo.url}
            alt={photo.title}
            loading="lazy"
            onClick={() => onClick(photo)}
            onDoubleClick={() => onDoubleClick(photo)}
        />
    )
}