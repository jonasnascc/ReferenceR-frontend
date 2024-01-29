import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

type TagsBarProps = {
    tags : {name:string, url: string} [],
    loading ?: boolean
}

export const TagsBar = ({tags, loading} : TagsBarProps) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <Bar $expanded={expanded}>
            {loading || tags.length==0 ? (null) : (
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
            )}
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
    background-color: #36383d;
    color: white;
    margin: 10px 0px;

    &:hover {
        background-color: #2b2d31;
        cursor: pointer;
    }
`


const Bar = styled.div<{$expanded?: boolean}>`
    position: absolute;
    bottom: 0px;
    right: 0px;
    min-height: 50px;
    max-height: 90%;
    height: ${props => props.$expanded ? "auto" : "50px"};
    width: 100%;
    background-color:#4f5157;

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