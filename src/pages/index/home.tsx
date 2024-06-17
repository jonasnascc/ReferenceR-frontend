import { useNavigate, useSearchParams } from "react-router-dom";
import { HomeContainer, Logo, LogoImage, LogoText, SearchContainer } from "./styles";
import { SearchInput } from "../../shared/components/Inputs/SearchInput/SearchInput";
import logo from "../../logo.svg"
import { useState } from "react";
import { useQuery } from "react-query";
import { getAuthorProfile } from "../../api/services/Author";
import { Author } from "../../model/Author";
export const HomePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const [author, setAuthor] = useState<Author>()

    const authorName = searchParams.get("authorName");

    const {
        isLoading,
        isError
    } = useQuery<Author>([authorName], () => getAuthorProfile(authorName??"", "deviantart"), {
        enabled: Boolean(authorName),
        refetchOnWindowFocus: false,
        retry: 2,
        onSuccess: (data) => {
            setAuthor(data)
        },
        onError: (err) => {
            console.log("erro")
        }
    })

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
                    // pathSearch={{path:"/author/{}/gallery", placeholder:"{}"}}
                    loading={isLoading}
                    authorMetadata={author}
                />
            </SearchContainer>
            
            <br/>
        </HomeContainer>
    )

}