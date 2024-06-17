export type Author = {
    iconUrl: string,
    userTagline: string,
    userName: string,
    deviations: number,
    watchers?: number,
    watching?: number,
    pageviews?: number,
    favourites?: number
}

export type AuthorSugestion = {
    iconUrl : string,
    userName:string,
    userTagline:string,
    deviations:number
}