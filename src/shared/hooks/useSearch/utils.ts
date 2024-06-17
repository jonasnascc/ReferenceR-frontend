import { AuthorSugestion, Author } from "../../../model/Author";

export const getAuthorFromLocalStorage = (name : string) => {
    const array = localStorage.getItem("author-sugestions")
    if(!array) return;
    
    try{
        const sugestions : AuthorSugestion[] = JSON.parse(array)
        if(sugestions.length === 0) return;

        const result = sugestions.filter(author => author.userName.toLowerCase() === name.toLowerCase())

        return result.length>0 ? result[0] : undefined
    }catch(err) {
        return;
    }
}

export const saveAuthorInLocalStorage = (author:Author) => {
    const array = localStorage.getItem("author-sugestions")
    if(!array) {
        const sugestionsArray : AuthorSugestion[] = [
            {...author}
        ]
        localStorage.setItem("author-sugestions", JSON.stringify(sugestionsArray))
        return;
    }
    try{
        let sugestions : AuthorSugestion[] = JSON.parse(array)

        const result = sugestions.filter(a => a.userName.toLowerCase() === author.userName.toLowerCase())

        if(result.length>0) return;

        sugestions = [...sugestions, {...author}]
        localStorage.setItem("author-sugestions", JSON.stringify(sugestions))
    }catch(err) {
        return;
    }
}

export const getAuthorSugestions = () : AuthorSugestion[]  => {
    const array = localStorage.getItem("author-sugestions")
    if(!array) return []

    try{
        let sugestions : AuthorSugestion[] = JSON.parse(array)
        return sugestions
    }catch(err) {}

    return []
}