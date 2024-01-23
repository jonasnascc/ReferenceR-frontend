import { Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { NavigationButtons } from "./NavigationButtons";

import { SelectionMenu } from "./SelectionMenu";

type NavigationBarProps = {
    handlePageChange: (newPage:number) => void,
    page ?: number,
    pageLimit ?: number,
    onSelect : (state : boolean) => void;
}

export const NavigationBar = ({page, pageLimit, handlePageChange, onSelect} : NavigationBarProps) => {
    return (
        <BarContainer>
            <Bar>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <NavigationButtons onPageChange={handlePageChange} page={page ?? 1} pageLimit={pageLimit ?? 1}/>
                    </Grid>
                    <Grid item xs={4}>
                        <SelectionMenu onSelect={onSelect}/>
                    </Grid>
                </Grid>
            </Bar>
        </BarContainer>
    )
}

const BarContainer = styled.div`
    display: flex;
    align-items : center;
    justify-content: center;
    position: fixed;
    bottom : 50px;
    width : 100%;
    height: 60px;
`

const Bar = styled.div`
    display: flex;
    align-items : center;
    background-color: #C7CEE1;
    height: 100%;
    width: 30%;
    border-radius : 30px;
`

