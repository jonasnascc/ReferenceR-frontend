import React from "react";
import { useParams } from "react-router-dom";

export const AuthorPage = () => {
    const {authorName} = useParams();

    return (<h1>Author Name: {authorName}</h1>)
}