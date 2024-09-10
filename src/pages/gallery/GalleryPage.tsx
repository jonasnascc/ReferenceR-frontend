import { useParams } from "react-router-dom";
import { GalleryBlock } from "../../shared/components/GalleryBlock/GalleryBlock";
import { useGallery } from "../../shared/hooks/useGallery";

export const GalleryPage = () => {
    const {authorName} = useParams()

    const props = useGallery({
        authorName: authorName, 
        userFavourites: false,
        provider:"deviantart"
    })

    
    return(<GalleryBlock {...props}/>)
}