import { Box } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

export const SearchBar = ({handleSearch} : {handleSearch : (value : string) => void}) =>{
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValueChange = (event : any) => {
        setSearchValue(event.target.value.replace(" ", ""));
    }

    const handleSearchButtonClick = (event : any) => {
        handleSearch(searchValue)
    }

    return(
        <Container>
            <SearchForm action="/author" method="GET">
                <Selector name="provider" defaultValue="deviantart">
                    <option value="deviantart" id="deviantart">DeviantArt</option>
                </Selector>
                <Input type="text" id="author" name="author" value={searchValue} onChange={handleSearchValueChange}/>
                <SearchButton type="submit" onClick={handleSearchButtonClick}>Ir</SearchButton>
            </SearchForm>
        </Container>
    )
} 

const Container = styled.div`
    display:flex;
    background-color : white;
    border-radius : 15px;
    width : 100%;
    height : 43px;
`

const Selector = styled.select`
    z-index : 100;
    display : flex;
    margin: 0px 20px 0px 20px;
    align-items:center;
    color : #585858;
    font-size : 12px;
    border : none;
    background : none;
        
`

const SearchForm = styled.form`
    display : flex;
    justify-content : space-between;
    align-items : center;
    width : 100%;
`

const Input = styled.input`
    z-index : 100;
    flex : 1;
    border-radius : inherit;
    border : none;
    outline : none;
    font-size : 15px;
    height: 90%;
`

const SearchButton = styled.button`
    display : flex;
    background : none;
    color : black;
    font-size : 15px;
    font-family : inherit;
    border : none;
    margin : 20px;
`

