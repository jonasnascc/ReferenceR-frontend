import React from "react";
import { SimplePhoto } from "../../../../model/photo";

type PhotoSlideProps = {
    currentPhoto : SimplePhoto,
    onLoadPhoto ?: () => void
}

export const PhotoSlide = ({currentPhoto, onLoadPhoto = () => {} } : PhotoSlideProps) => {
    return (
        <div>
            <img
                src={currentPhoto.url}
                alt={currentPhoto?.title}
                style={{
                    maxWidth: "100%",
                    maxHeight: "90vh"
                }}
                onLoad={onLoadPhoto}
            />
        </div>
    )
}