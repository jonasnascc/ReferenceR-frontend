import React from "react"
import { useParams } from "react-router-dom"

export const GalleryPage = () => {
    const {authorName} = useParams()
   return (<h1>{authorName}'s gallery</h1>) 
}