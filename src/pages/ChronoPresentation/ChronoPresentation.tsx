import React from "react";
import { useLocation } from "react-router-dom";

// type ChronoPresentationProps = {
// }

export const ChronoPresentation = () => {
    const location = useLocation();
    
    return (
        <>
        { location.state !== null && JSON.stringify(location.state) }
        </>
    )
}