import { Avatar, Divider } from "@mui/material";
import { Author, AuthorSugestion } from "../../../../../model/Author";
import { AuthorTagline, AuthorUsername, DeviationsCount, ResultTag, SearchWindow, SearchWindowExpand, SectionText, SugestionsContainer, TagText, VisibilitySwitchBox } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";

export type FloatingSearchWindowProps = {
    visible?:boolean,
    author?:Author,
    sugestions?:AuthorSugestion[],
    onSugestionClick?:(sugestion:AuthorSugestion) => void
}

export const FloatingSearchWindow = ({author, sugestions=[], onSugestionClick=()=>null, visible=false} : FloatingSearchWindowProps) => {
    const navigate = useNavigate()
    
    const handleResultTagClick = (authorName : string) => {
        navigate(`/author/${authorName}/gallery`)
    }
    
    return (
        <VisibilitySwitchBox visible={visible}>
        <SearchWindowExpand visible={visible}>
        <SearchWindow>
            <Divider style={{minWidth:"100%", backgroundColor:"white"}}/>
            {
                author&&(
                    <>
                    <SectionText>RESULTS</SectionText>
                    <ResultTag onClick={() => handleResultTagClick(author.userName)}>
                        <Avatar src={author.iconUrl}/>
                        <TagText>
                            <AuthorUsername>{author.userName}</AuthorUsername>
                            <AuthorTagline>{author.userTagline}</AuthorTagline>
                            <DeviationsCount>{`${author.deviations} photos`}</DeviationsCount>
                        </TagText>
                    </ResultTag>
                    </>
                )
            }
            {
                sugestions.length > 0&&(
                    <>
                    <SectionText>SUGESTIONS</SectionText>
                    <SugestionsContainer>
                    {
                        sugestions.map((sug, index) => (
                            <ResultTag sugestions key={index} onClick={() => onSugestionClick(sug)}>
                                <Avatar src={sug.iconUrl} sx={{height:"20px", width:"20px"}}/>
                                <TagText>
                                    <AuthorUsername>{sug.userName}</AuthorUsername>
                                </TagText>
                            </ResultTag>
                        ))
                    }
                    </SugestionsContainer>
                    </>

                )
            }
        </SearchWindow>
        </SearchWindowExpand>
        </VisibilitySwitchBox>
    );   
}