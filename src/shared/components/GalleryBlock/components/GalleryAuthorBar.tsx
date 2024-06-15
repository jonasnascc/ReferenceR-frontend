import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAuthorProfile } from "../../../../api/services/Author";
import { Author } from "../../../../model/Author";
import { AuthorTile } from "./styles";

export const GalleryAuthorBar = ({author, provider} : {author:string, provider:string}) => {
    const [authorProfile, setAuthorProfile] = useState<Author>()

    useQuery<Author>([author + "-author-info"], () => getAuthorProfile(author,provider), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setAuthorProfile(data)
        }
    })

    return(
        <>
        {authorProfile&&(
            <AuthorTile>
                <Avatar alt={authorProfile.userName} src={authorProfile.iconUrl} sx={{width:"50px", height: "auto"}}/>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{`${authorProfile.userName}`}</Typography>
                    <Typography variant="subtitle2">{`${authorProfile.userTagline}`}</Typography>
                </Box>
            </AuthorTile>
        )}
        </>
    )
}