import { useContext, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthorBar } from "../../pages/Album/components/AuthorBar";
import { SearchContext } from "../../context/Search/SearchContext";

export const Layout = () => {
    const {author, provider} = useContext(SearchContext);

    return (
        <BodyContainer>
            <NavBar/>
            {author!==null&&provider!==null && <AuthorBar albumsSize={0} author={author} provider={provider} />}
            
            <Content>
                <Outlet/>
            </Content>
        </BodyContainer>
    )
}

const BodyContainer = styled.div`
    height: 100%;
    width: 100%;
`

const Content = styled.div`
    position: relative;
`