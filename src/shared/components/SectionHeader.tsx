import React from "react";
import styled from "styled-components";



export const SectionHeader = ({label}: {label:string}) => {
    return(
        <Header>
            {label}
            <hr/>
        </Header>
    )
}

const Header = styled.h3`
    font-size: 20px;
    font-weight : normal;
    margin: 10px 0 20px 0;
`