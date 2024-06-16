import { FormEvent, useState } from "react";
import { InputContainer, SearchTextField, TextFieldContainer } from "./styles";

import SearchIcon from '@mui/icons-material/Search';
import { SearchButton } from "../../Buttons/styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type SearchInputProps = {
    id?:string, 
    name?:string, 
    navbar?:boolean,
    pathSearch?:{
        path: string,
        placeholder ?: string
    },
    fullWidth?:boolean
}

export const SearchInput = ({fullWidth, pathSearch, ...props} : SearchInputProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const handleChange = (event:any) => {
        setSearch(event.target.value)
    }

    const handleSubmit = () => {
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

    
    return (
        <InputContainer navbar={props.navbar}>
            <TextFieldContainer fullWidth={fullWidth}>
                <SearchTextField
                    type="string"
                    onChange={handleChange}
                    value={search}
                    {...props}
                />
                <SearchInputSubmitBtn onSubmit={handleSubmit}/>
            </TextFieldContainer>
        </InputContainer>
    )
}

const SearchInputSubmitBtn = (props : {
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
            <SearchIcon/>
        </SearchButton>
    )
}