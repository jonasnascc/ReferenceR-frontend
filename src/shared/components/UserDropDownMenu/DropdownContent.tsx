import React from "react";
import styled from "styled-components";

type DropdownContentProps = {
    display : boolean, 

}

export const DropdownContent = ({display} : DropdownContentProps) => {
    return (
        <Content $display={display}>
            Sair
        </Content>
    )
}


const Content = styled.div<{$display : boolean}>`
    position: relative;
    ${props => !props.$display && "display: none;"}
    transition: display ease-in 0.7s;
    width: 100%;
    height: 100%;
    padding: 10px 15px;
`