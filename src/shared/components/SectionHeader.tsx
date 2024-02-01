import React from "react";
import styled from "styled-components";



export const SectionHeader = ({label, rightComponent}: {label:string, rightComponent ?: JSX.Element}) => {
    return(
        <SectionContainer>
            <Header>
                {label}
                <hr/>
            </Header>
            <RightSection>
                {rightComponent}
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
    width: 500px;
`