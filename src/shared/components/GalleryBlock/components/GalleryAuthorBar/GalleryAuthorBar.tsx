import { Avatar } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthorName, AuthorNameBox, AuthorTagline, AuthorTile, ButtonsDiv, StatNumber, StatText, StatTile, StatsBlock } from "./styles";
import { getAuthorProfile } from "../../../../../api/services/Author";
import { Author } from "../../../../../model/Author";
import { OutlinedButton } from "../../../Buttons/styles";

export const GalleryAuthorBar = ({author, provider, collectionsPage=false} : {author:string, provider:string, collectionsPage?:boolean}) => {
    const [authorProfile, setAuthorProfile] = useState<Author>()

    useQuery<Author>([author + "-author-info"], () => getAuthorProfile(author,provider), {
        enabled: author!=="",
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setAuthorProfile(data)
        }
    })

    return(
        <>
        {authorProfile&&(
            <AuthorTile>
                <Avatar alt={authorProfile.userName} src={authorProfile.iconUrl} sx={{width:"40px", height: "auto"}}/>
                <AuthorNameBox>
                    <AuthorName>{`${authorProfile.userName}`}</AuthorName>
                    <AuthorTagline>{`${authorProfile.userTagline}`}</AuthorTagline>
                </AuthorNameBox>
                <ButtonsDiv>
                    <OutlinedButton color="#FCFF55">Favorite</OutlinedButton>
                    <OutlinedButton color="#D217E2">DeviantArt</OutlinedButton>
                </ButtonsDiv>
                <StatsBlock>
                    <Statistic
                        text="DEVIATIONS"
                        statNumber={authorProfile.deviations}
                    />
                    <Statistic
                        text="WATCHERS"
                        statNumber={authorProfile?.watchers??0}
                    />
                    <Statistic
                        text="FAVORITES"
                        statNumber={authorProfile?.favourites??0}
                    />
                </StatsBlock>
            </AuthorTile>
        )}
        </>
    )
}

const Statistic = ({statNumber, text} : {statNumber:number, text:string}) => {
    return (
        <StatTile>
            <StatNumber>{statNumber}</StatNumber>
            <StatText>{text}</StatText>
        </StatTile>
    )
}