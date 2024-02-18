import React from 'react'
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const ShowPhotosButton = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("albums", {state: {favoritedAlbums : true}})
    }

    return (
            <Content onClick={handleClick}>
                <Text>Show photos</Text>
                <EastRoundedIcon/>
            </Content>
    )
}

const Content = styled.div`
    display: inline-flex;
    align-items: center;
    
    height: 100%;
    
    &:hover {
        cursor: pointer;
        background-color: #ebebeb;
    }
`

const Text = styled.div`
    top : 0;
    display: inline-flex;
    align-items: center;
    padding : 0 10px;
`

