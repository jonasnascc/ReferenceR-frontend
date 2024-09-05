import styled from "@emotion/styled";
import { CustomButton } from "../Buttons/styles";

export const ExpandButton = styled(CustomButton)<{footer?:boolean}>`
    ${props => props.footer&&`
        position: absolute;
        right: 0;
    `}
    display: flex;
    align-items: center;
    color: white;
`
