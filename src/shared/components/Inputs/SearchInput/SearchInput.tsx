import { useEffect, useRef } from "react";
import { InputContainer, SearchTextField, TextFieldContainer } from "./styles";

import SearchIcon from '@mui/icons-material/Search';
import { SearchButton } from "../../Buttons/styles";
import { FloatingSearchWindow } from "./FloatingSearchWindow/FloatingSearchWindow";
import { CircularProgress } from "@mui/material";
import { useSearch, useSearchProps } from "../../../hooks/useSearch/useSearch";

type SearchInputProps = {
    id?:string, 
    navbar?:boolean,
    fullWidth?:boolean,
}&useSearchProps

export const SearchInput = (props : SearchInputProps) => {
    const {fullWidth, pathSearch, onSubmit, ...values} = props
    
    const containerRef = useRef<HTMLFormElement | null>(null);

    const {
        sugestions,
        author,
        search,
        setWindowVisible,
        handleSubmit,
        handleChange,
        loading,
        isSearchWindowVisible,
        handleSugestionClick
    } = useSearch({...props})

    useEffect(() => {
        const handleClickOutside = (event:any) => {
            setWindowVisible(!(containerRef.current && !containerRef.current.contains(event.target)));
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <InputContainer ref={containerRef} navbar={props.navbar}>
            <TextFieldContainer 
                fullWidth={fullWidth}
            >
                <SearchTextField
                    type="string"
                    onChange={handleChange}
                    value={search}
                    autoComplete="off"
                    {...values}
                />
                <SearchInputSubmitBtn 
                    onSubmit={handleSubmit} 
                    loading={loading}
                />
                <FloatingSearchWindow
                    author={author}
                    sugestions={sugestions} 
                    visible={isSearchWindowVisible}
                    onSugestionClick={handleSugestionClick}
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