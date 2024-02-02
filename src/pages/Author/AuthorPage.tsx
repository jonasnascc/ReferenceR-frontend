import { Container } from "@mui/material";
import React, { useContext } from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { SearchContext } from "../../context/Search/SearchContext";

export const AuthorPage = () => {
    const {author} = useContext(SearchContext);

    return (
        <>
        {
        author && (
            <Container>
                <SectionHeader label={author} />
            </Container>
        )
        }
        </>
    )
}