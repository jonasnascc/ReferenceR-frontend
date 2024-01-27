import { Button, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

type TagsBarProps = {
    tags : {name:string, url: string} []
}

export const TagsBar = ({tags} : TagsBarProps) => {
    const [expanded, setExpanded] = useState(false)


    return (
        <Bar $expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <Content>
                    {
                        tags.map(tag =>
                            <Tag key={tags.indexOf(tag)}>{tag.name}</Tag>
                        )
                    }
                
            </Content>
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
`


const Bar = styled.div<{$expanded?: boolean}>`
    position: absolute;
    bottom: 10px;
    height: ${props => props.$expanded ? "200px" : "50px"};
    width: calc(100% - 5px);
    background-color: #4166C7;
    border-radius : 0px 0px 10px 10px;

    transition : height 0.2s linear;
`

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content : center;
    position:relative;
    width: 100%;
    height: 100%;
    color: white;
    overflow: hidden;
`