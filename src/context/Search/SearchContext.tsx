import { createContext } from "react";

export type SearchContextType = {
    author : string | null,
    provider : string | null,
    albumId : string | null,
    page : number | null,
    searchAuthor : ((authorName : string) => any) | null;
    selectProvider : ((providerName : string) => any) | null;
    changeAlbumId : ((albumId : string) => any) | null;
    changePage : ((page : number) => any) | null;
}

export const SearchContext = createContext<SearchContextType>({
    author:null,
    searchAuthor: null,
    provider: null,
    selectProvider: null, 
    albumId: null, 
    changeAlbumId : null,
    page: null,
    changePage : null
})
