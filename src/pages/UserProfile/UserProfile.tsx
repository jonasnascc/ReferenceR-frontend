import React from "react";
import { useParams } from "react-router-dom";

export const UserProfilePage = () => {
    const {userId} = useParams();

    return (<h1>User Profile (id={userId})</h1>)
}