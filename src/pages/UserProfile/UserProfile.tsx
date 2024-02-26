import { Box, Container, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";

export const UserProfile = () => {
    const[checked, setChecked] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem("mature");

        if (storedValue) {
            const parsedValue = JSON.parse(storedValue);
            if (typeof parsedValue === 'boolean') 
                setChecked(parsedValue);
        }
    },[])

    const handleMature = (event : any) => {
        const state = event.target.checked;
        localStorage.setItem("mature", JSON.stringify(state));
        setChecked(state);
    }

    return (
        <Container>
            <Box>
                Mature Content:
                <Switch checked={checked} onClick={handleMature}/>
            </Box>
        </Container>
    )
}