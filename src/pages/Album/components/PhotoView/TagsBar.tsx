import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

type TagsBarProps = {
    tags : {name:string, url: string} []
}

export const TagsBar = ({tags} : TagsBarProps) => {
    const [expanded, setExpanded] = useState(false)


    return (
        <Bar $expanded={expanded}>
            <Grid container>
                <Grid item xs={11}>
                <Content>
                    {
                        tags.map(tag =>
                            <Tag key={tags.indexOf(tag)}>{tag.name}</Tag>
                        )
                    }
                </Content>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{display: "flex"}}  onClick={() => setExpanded(!expanded)}>
                        <Tag>...</Tag>
                    </Box>
                </Grid>
            </Grid>
        </Bar>
    )
}

const Tag = styled.span`
    display: flex;
    align-items: center;
    justify-content : center;
    height : 30px;
    padding: 10px;
    border-radius: 15px;
    margin: 0px 4px 0px 4px;
    font-size: 14px;
    background-color: #2B51B5;
    color: white;
    margin: 10px 0px;

    &:hover {
        background-color: #213e89;
        cursor: pointer;
    }
`


const Bar = styled.div<{$expanded?: boolean}>`
    position: absolute;
    bottom: 10px;
    right: 0px;
    max-height: 90%;
    height: ${props => props.$expanded ? "auto" : "50px"};
    width: 100%;
    background-color: #4166C7;
    border-radius : 0px 0px 10px 10px;

    transition : height 0.2s linear;

    overflow:hidden;
`

const Content = styled.div`
    position:relative;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    left : 0px;
    bottom: 0px;
    align-items: center;
    justify-content : center;
    height: 100%;
    color: white;
    overflow: hidden;
`