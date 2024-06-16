import React, { useState } from "react"
import { useQueryClient } from "react-query"
import { getAuthorProfile } from "../../api/services/Author";
import { Author } from "../../model/Author";
import { useNavigate } from "react-router-dom";
import { HomeContainer, Logo, LogoImage, LogoText, SearchContainer } from "./styles";
import { SearchInput } from "../../shared/components/Inputs/SearchInput/SearchInput";
import logo from "../../logo.svg"
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
        <HomeContainer>
            <Logo>
                <LogoImage src={logo} alt="logo"/>
                <LogoText>REFERENCER</LogoText>
            </Logo>
            <SearchContainer>
                <SearchInput 
                    id="authorName" 
                    name="authorName" 
                    fullWidth
                    pathSearch={{path:"/author/{}/gallery", placeholder:"{}"}}
                />
            </SearchContainer>
            
            <br/>
            {loading&&(<p>Loading...</p>)}
            {profile&&!notFoundMsg&&!loading&&<div>
                <img src={profile.iconUrl} alt={profile.userTagline} width="120px" height="auto"/>
                <h2>@{profile.userName}</h2> 
                <h4>{profile.userTagline}</h4>
                {
                    profile.deviations > 0 &&(
                        <button onClick={() => handleSeeGallery(profile.userName)}>See Gallery</button>
                    )
                }
            </div>}
        </HomeContainer>
    )

}