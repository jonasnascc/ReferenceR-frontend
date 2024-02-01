import React from "react";
import styled from "styled-components";
import { ExpandButton } from "./ExpandButton";

type HeaderControlButtonsProps = {
    onExpand ?: (event: any) => any,
}

export const HeaderControlButtons = ({onExpand = () => null} : HeaderControlButtonsProps) => { //expand, select, delete, show
    return (
        <ButtonsDiv>
            <ExpandButton onChange={onExpand}/>
        </ButtonsDiv>
    );
}

const ButtonsDiv = styled.div`
    height: 100%;
`