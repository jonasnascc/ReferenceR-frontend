import { FormEvent, useRef, useState } from "react";
import { InputContainer, SearchTextField, TextFieldContainer } from "./styles";

import SearchIcon from '@mui/icons-material/Search';
import { SearchButton } from "../../Buttons/styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FloatingSearchWindow, FloatingSearchWindowProps } from "./FloatingSearchWindow/FloatingSearchWindow";
import { CircularProgress } from "@mui/material";
import { Author } from "../../../../model/Author";

type SearchInputProps = {
    id?:string, 
    name?:string, 
    authorMetadata?:Author,
    navbar?:boolean,
    pathSearch?:{
        path: string,
        placeholder ?: string
    },
    fullWidth?:boolean,
    loading ?:boolean,
    onSubmit ?: (value:string) => void
}

export const SearchInput = ({fullWidth, pathSearch, loading, onSubmit, authorMetadata, ...props} : SearchInputProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const [isSearchWindowVisible, setWindowVisible] = useState(false);

    const handleChange = (event:any) => {
        setSearch(event.target.value)
    }

    const handleSubmit = () => {
        if(onSubmit) onSubmit(search)
        if(pathSearch) {
            if(pathSearch.placeholder) 
                navigate(pathSearch.path.replace(pathSearch.placeholder, search))
            else navigate(pathSearch.path)
            return;
        }
        if(props.name){
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(props.name, search)
            setSearchParams(newSearchParams);
        }
        
    }

    const handleFocus = () => {
        setWindowVisible(true)
    }

    const handleBlur = () => {
        setWindowVisible(false)
    }

    const handleClickOnSearchWindow = () => {
        console.log("click")
    }
    
    return (
        <InputContainer navbar={props.navbar}>
            <TextFieldContainer fullWidth={fullWidth}>
                <SearchTextField
                    type="string"
                    onChange={handleChange}
                    value={search}
                    autoComplete="off"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    {...props}
                />
                <SearchInputSubmitBtn 
                    onSubmit={handleSubmit} 
                    loading={loading}
                />
                <FloatingSearchWindow
                    author={authorMetadata} 
                    visible={isSearchWindowVisible}
                />
            </TextFieldContainer>
        </InputContainer>
    )
}

const SearchInputSubmitBtn = (props : {
    loading?:boolean,
    onSubmit ?: () => void
}) => {
    const handleClick = (event : any) => {
        event.preventDefault()
        if(props.onSubmit) 
            props.onSubmit()
    }

    return (
        <SearchButton
            type="submit"
            onSubmit={handleClick}
            onClick={handleClick}
        >
            {props.loading ? (<CircularProgress size={20} sx={{color:"white"}}/>) : (<SearchIcon/>)}
        </SearchButton>
    )
}