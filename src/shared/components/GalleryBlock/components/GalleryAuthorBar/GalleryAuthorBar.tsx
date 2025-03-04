import { Avatar } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthorName, AuthorNameBox, AuthorTagline, AuthorTile, ButtonsDiv, StatNumber, StatText, StatTile, StatsBlock } from "./styles";
import { getAuthorProfile } from "../../../../../api/services/Author";
import { Author } from "../../../../../model/Author";
import { OutlinedButton } from "../../../Buttons/styles";
import { RequireAuth } from "../../../../../context/RequireAuth";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const GalleryAuthorBar = ({author, provider, collectionsPage=false} : {author:string, provider:string, collectionsPage?:boolean}) => {
    const [authorProfile, setAuthorProfile] = useState<Author>()

    const authorName = `${author[0].toUpperCase()}${author.substring(1, author.length)}`

    useQuery<Author>([author + "-author-info"], () => getAuthorProfile(author,provider), {
        enabled: author!=="" && !collectionsPage,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setAuthorProfile(data)
        }
    })

    return(
        <>
        {(authorProfile||collectionsPage)&&(
            <AuthorTile>
                {
                    authorProfile ? (
                        <Avatar alt={authorProfile?.userName} src={authorProfile.iconUrl} sx={{width:"40px", height: "auto"}}/>
                    ) : (
                        <Avatar sx={{width:"40px", height: "40px", bgcolor: "#D217E2"}}>{`${author[0]??""}`.toUpperCase()}</Avatar>
                    )
                }
                <AuthorNameBox>
                    <AuthorName>{`${authorProfile?.userName??authorName}`}</AuthorName>
                    {authorProfile&&<AuthorTagline>{`${authorProfile.userTagline}`}</AuthorTagline>}
                </AuthorNameBox>
                {authorProfile&&
                    <>
                    <ButtonsDiv>
                        <RequireAuth><OutlinedButton color="#FCFF55">Favorite</OutlinedButton></RequireAuth>
                        <OutlinedButton color="#D217E2">DeviantArt <OpenInNewIcon/></OutlinedButton>
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
                    </>
                }
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