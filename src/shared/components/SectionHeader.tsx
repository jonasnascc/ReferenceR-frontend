import React from "react";
import styled from "styled-components";

type SectionHeaderProps = {
    label:string, 
    children ?: JSX.Element
}

export const SectionHeader = ({label, children}: SectionHeaderProps ) => {
    return(
        <SectionContainer>
            <Header>
                {label}
                <hr/>
            </Header>
            <RightSection>
                {children}
            </RightSection>
        </SectionContainer>
    )
}

const SectionContainer = styled.div`
    position: relative;
    height: 100%;
`

const Header = styled.h3`
    font-size: 20px;
    font-weight : normal;
    margin: 10px 0 20px 0;
`

const RightSection = styled.div`
    position: absolute;
    top : 0px;
    right: 0px;
    height: 100%;
`