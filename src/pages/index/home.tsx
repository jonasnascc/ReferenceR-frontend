import { useNavigate } from "react-router-dom";
import { HomeContainer, Logo, LogoImage, LogoText, SearchContainer } from "./styles";
import { SearchInput } from "../../shared/components/Inputs/SearchInput/SearchInput";
import logo from "../../logo.svg"
export const HomePage = () => {
    const navigate = useNavigate();;

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
        </HomeContainer>
    )

}