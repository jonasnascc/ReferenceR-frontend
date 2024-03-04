import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../../context/Search/SearchContext";

export const SearchBar = () =>{
    const {searchAuthor, selectProvider} = useContext(SearchContext);

    const [searchValue, setSearchValue] = useState("");
    const [providerValue, setProviderValue] = useState("deviantart");

    const handleSearchValueChange = (event : any) => {
        setSearchValue(event.target.value.replace(" ", ""));
    }

    const handleProviderSelectorClick = (event : any) => {
        setProviderValue(event.target.value);
    }

    const handleSearchButtonClick = (event : any) => {
        if(searchAuthor !== null) 
            searchAuthor(searchValue);
        if(selectProvider !== null) 
            selectProvider(providerValue)
    }
    return(
        <div className="align-vert">
            <Container>
                <SearchForm action="/author" method="GET">
                    <Selector 
                        name="provider" 
                        defaultValue="deviantart"
                    >
                        <option value="deviantart" id="deviantart" onClick={handleProviderSelectorClick} defaultValue={"deviantart"}>DeviantArt</option>
                    </Selector>

                    <Input 
                        type="text" 
                        id="author-search" 
                        name="author" 
                        value={searchValue} 
                        onChange={handleSearchValueChange}
                        placeholder="Search for an author username"
                    />
                    
                    <SearchButton 
                        type="submit"
                        onClick={handleSearchButtonClick}
                    >
                        Ir
                    </SearchButton>
                </SearchForm>
            </Container>
        </div>
        
    )
} 

const Container = styled.div`
    display:flex;
    background-color : white;
    border-radius : 10px;
    width : 100%;
    height : 40px;
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
    cursor: pointer;
`

const SearchForm = styled.form`
    display : flex;
    justify-content : space-between;
    align-items : center;
    width : 100%;
    overflow: hidden;
`

const Input = styled.input`
    z-index : 100;
    flex : 1;
    border-radius : inherit;
    border : none;
    outline : none;
    font-size : 15px;
    height: 90%;
    width: 100%;
    background-color: transparent;
`

const SearchButton = styled.button`
    display : flex;
    background : none;
    color : black;
    font-size : 15px;
    font-family : inherit;
    border : none;
    margin : 20px;
    cursor : pointer;
`

