import React, { FormEvent, HTMLProps } from "react";
import { InputContainer, SearchTextField, TextFieldContainer } from "./styles";

import SearchIcon from '@mui/icons-material/Search';
import { SearchButton } from "../../Buttons/styles";

export const SearchInput = () => {
    return (
        <InputContainer>
            <TextFieldContainer>
                <SearchTextField/>
                <SearchInputSubminBtn/>
            </TextFieldContainer>
        </InputContainer>
    )
}

const SearchInputSubminBtn = (props : {
    onSubmit ?: (event: FormEvent<HTMLButtonElement>) => void
}) => {
    const handleClick = (event : any) => {
        event.preventDefault()
        if(props?.onSubmit) props.onSubmit(event)
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