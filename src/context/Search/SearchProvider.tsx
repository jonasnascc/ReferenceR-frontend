import React, { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({children} : {children : JSX.Element}) => {
    const urlParams = new URLSearchParams(window.location.search);

    const authorName = urlParams.get("author");     
    const providerName = urlParams.get("provider");     

    const [author, setAuthor] = useState<string|null>(authorName)
    const [provider, setProvider] = useState<string|null>(providerName)

    const searchAuthor = (authorName : string) => {
        setAuthor(authorName);
    }

    const selectProvider = (providerName: string) => {
        setProvider(providerName);
    }

    return (
        <SearchContext.Provider value={{author: author, provider: provider, searchAuthor : searchAuthor, selectProvider : selectProvider}}>
            {children}
        </SearchContext.Provider>
    )
}