import React, { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({children} : {children : JSX.Element}) => {
    const urlParams = new URLSearchParams(window.location.search);

    const authorName = urlParams.get("author");     
    const providerName = urlParams.get("provider");     

    const album = urlParams.get("albumId"); 
    const pageNumber = urlParams.get("page"); 

    const [author, setAuthor] = useState<string|null>(authorName);
    const [provider, setProvider] = useState<string|null>(providerName);
    const [albumId, setAlbumId] = useState<string|null>(album);
    const [page, setPage] = useState<number|null>(pageNumber as unknown as number);

    const searchAuthor = (authorName : string) => {
        setAuthor(authorName);
    }

    const selectProvider = (providerName: string) => {
        setProvider(providerName);
    }

    const changePage = (page : number) => {
        if(albumId!==null) {
            setPage(page);
            urlParams.set("page" , page.toString());
            // console.log(page, albumId)
        }
    }

    const changeAlbumId = (id : string) => {
        setAlbumId(id);
        urlParams.set("albumId", id)
        // console.log(id);
    }

    return (
        <SearchContext.Provider value={{
            author: author,
            provider: provider,
            albumId : albumId,
            page : page,
            changeAlbumId : changeAlbumId,
            changePage : changePage,
            searchAuthor : searchAuthor,
            selectProvider : selectProvider
        }}>
            {children}
        </SearchContext.Provider>
    )
}