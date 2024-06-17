import { useState, useEffect } from "react"
import { useQueryClient } from "react-query"
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { getAuthorProfile } from "../../../api/services/Author"
import { Author, AuthorSugestion } from "../../../model/Author"
import { saveAuthorInLocalStorage, getAuthorFromLocalStorage, getAuthorSugestions } from "./utils"

export type useSearchProps ={
    name?:string,
    pathSearch?:{
        path: string,
        placeholder ?: string
    },
    onSubmit ?: (value:string) => void
}

export const useSearch = ({name, pathSearch, onSubmit} : useSearchProps) => {
    const queryClient = useQueryClient()
    
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const {authorName:authorNameParam}= useParams()

    const [search, setSearch] = useState("")

    const [loading, setLoading] = useState(false)

    const [author, setAuthor] = useState<Author>()

    const [sugestions, setSugestions] = useState<AuthorSugestion[]>([])

    const [isSearchWindowVisible, setWindowVisible] = useState(false);

    const authorName = searchParams?.get("authorName") ?? (authorNameParam??"");

    const fetchSearch = async () => {
        setLoading(true)
        await queryClient.fetchQuery<Author>([authorName], () => getAuthorProfile(authorName??"", "deviantart"))
        .then((data) => {
            setAuthor(data)
            saveAuthorInLocalStorage(data)
            if(!search) setSearch(authorName??"")
        })
        .then((err) => err)
        setLoading(false)
    }

        
    const handleSubmit = (authorUserName ?: string) => {
        const value = authorUserName ? authorUserName : search 
        if(onSubmit) onSubmit(value)
        if(pathSearch) {
            if(pathSearch.placeholder) 
                navigate(pathSearch.path.replace(pathSearch.placeholder, value))
            else navigate(pathSearch.path)
            return;
        }
        if(name){
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(name, value)
            setSearchParams(newSearchParams);
        }
    }

    const handleSearchSet = () =>{
        if(authorName) {
            const saved = getAuthorFromLocalStorage(authorName)
            if(saved) {
                setAuthor({
                    ...saved,
                    watchers:0,
                    watching:0,
                    pageviews:0,
                    favourites:0
                })
                setSearch(authorName)
            }else fetchSearch()
            setWindowVisible(true)
            setSugestions(getAuthorSugestions()
                .filter(aut => aut.userName.toLowerCase() !== authorName.toLowerCase()))
        }
    }
    
    useEffect(() => {
        handleSearchSet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorName])

    useEffect(()=> {
        if(search.length===0) {
            setAuthor(undefined)
            setSugestions(getAuthorSugestions())
        }
    },[search])


    const handleChange = (event:any) => {
        setSearch(event.target.value)
    }

    const handleSugestionClick = (sugestion:AuthorSugestion) => {
        handleSubmit(sugestion.userName)
    }

    return {
        author,
        sugestions,
        search,
        loading,
        setWindowVisible,
        handleSubmit,
        handleChange,
        handleSugestionClick,
        isSearchWindowVisible
    }
}