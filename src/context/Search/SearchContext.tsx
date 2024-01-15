import { createContext } from "react";

export type SearchContextType = {
    author : string | null,
    provider : string | null,
    searchAuthor : ((authorName : string) => any) | null;
    selectProvider : ((providerName : string) => any) | null;
}

export const SearchContext = createContext<SearchContextType>({author:null, searchAuthor: null, provider: null, selectProvider: null})
