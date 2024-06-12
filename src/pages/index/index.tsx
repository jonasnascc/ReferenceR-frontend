import React, { useState } from "react"
import { useQueryClient } from "react-query"
import { getAuthorProfile } from "../../api/services/Author";
import { Author } from "../../model/Author";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [search, setSearch] = useState("");
    const [profile, setProfile] = useState<Author|null>(null);
    const [notFoundMsg, setNotFoundMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleSearch = (event:any) => {
        event.preventDefault()
        setNotFoundMsg(false)

        setLoading(true)
        queryClient.fetchQuery<Author>(["author-profile"], () => getAuthorProfile(search, "deviantart"))
            .then((data) => {
                setLoading(false)
                if(data) setProfile(data);
            })
            .catch((err) => {
                setNotFoundMsg(true)
                setProfile(null)
            })
    }

    const handleSearchChange = (event:any) => {
        setSearch(event.target.value)
    }

    const handleSeeGallery = (authorName:string) => {
        navigate(`author/${authorName}/gallery`)
    }

    return (
        <div>
            <h1>Search for an author</h1>
            <form>
                <input 
                    id="search-author"
                    type="text" 
                    name="search-author" 
                    onChange={handleSearchChange}
                    value={search}
                />
                <button type="submit" onClick={handleSearch}>Search</button>
                <br/>
                {
                    notFoundMsg&&(<span>Author not found</span>)
                }
            </form>
            <br/>
            {loading&&(<p>Loading...</p>)}
            {profile&&!notFoundMsg&&!loading&&<div>
                <img src={profile.iconUrl} alt={profile.userTagline} width="120px" height="auto"/>
                <h2>@{profile.userName}</h2> 
                <h4>{profile.userTagline}</h4>
                <p>{`deviations: ${profile.deviations}`}</p>
                <p>{`favourites: ${profile.favourites}`}</p>
                <p>{`page views: ${profile.pageviews}`}</p>
                <p>{`watchers: ${profile.watchers}`}</p>
                <p>{`watching: ${profile.watching}`}</p>
                {
                    profile.deviations > 0 &&(
                        <button onClick={() => handleSeeGallery(profile.userName)}>See Gallery</button>
                    )
                }
            </div>}
        </div>
    )

}