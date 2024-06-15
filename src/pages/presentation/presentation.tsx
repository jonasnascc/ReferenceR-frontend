import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Album } from "../../model/album";
import { usePresentation } from "../../shared/hooks/presentation/usePresentation";

export const PresentationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [albums] = useState<Album[]>([])

    const stateAlbums = location.state?.albums??[]
    if(stateAlbums.length === 0){
        navigate("/user/collections")
    }

    useEffect(() => {
        console.log(albums)
    }, [albums])

    const {
        currentPhoto,
        handleNextPhoto,
        handlePreviousPhoto    } = usePresentation(stateAlbums)



    if(stateAlbums.length === 0){
        return <Navigate to="/user/collections"/>
    }
    return(<>
        <div>
            <button onClick={handlePreviousPhoto} >previous</button>
            <button onClick={handleNextPhoto} >next</button>
        </div>
        {
            currentPhoto&&(
                <div>
                    <img
                        src={currentPhoto.url}
                        alt={currentPhoto?.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "90vh"
                        }}
                    />
                </div>
            )
        }
    </>)
}