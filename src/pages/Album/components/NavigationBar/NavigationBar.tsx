import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { NavigationButtons } from "./NavigationButtons";

import { SelectionMenu } from "./SelectionMenu";
import { DetailsMenu } from "./DetailsMenu";
import { Deviation } from "../../../../types/photo";

type NavigationBarProps = {
    handlePageChange: (newPage:number) => void,
    page ?: number,
    pageLimit ?: number,
    onSelect : (state : boolean) => any,
    onViewPhoto : () => any,
    viewAllowed ?: boolean
}

export const NavigationBar = ({page, pageLimit, handlePageChange, onSelect, onViewPhoto, viewAllowed} : NavigationBarProps) => {
    return (
        <Container>
            <BarContainer>
                <Bar>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <NavigationButtons onPageChange={handlePageChange} page={page ?? 1} pageLimit={pageLimit ?? 1}/>
                        </Grid>
                        <Grid item xs={2}>
                            {viewAllowed&&<DetailsMenu onClick={onViewPhoto}/>}
                        </Grid>
                        <Grid item xs={2}>
                            <SelectionMenu onSelect={onSelect}/>
                        </Grid>
                    </Grid>
                </Bar>
            </BarContainer>
        </Container>
    )
}

const BarContainer = styled.div`
    display: flex;  
    justify-content : center;
    position: fixed;
    bottom: 40px;
    left: 0px;
    width: 100%;
    
    z-index : 100;
`

const Bar = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 30%;
    height: 6vh;
    background-color: #4f5157;
    border-radius : 2vh;
    color: white;
`

