import styled from "@emotion/styled";
import { CustomButton } from "../../../../shared/components/Buttons/styles";

export const ActionButtonsDiv = styled.div<{footerMode?:boolean}>`
    display: flex;
    justify-content: space-evenly;
    gap: .5vw;
    align-items: center;
    background-color: #181134;
    height: 40px;
    border-radius: 15px;
    padding: 3px .5vw;
    margin: 0 25px;
    flex-wrap: wrap;
`

export const ActionButton = styled(CustomButton)`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #D217E2
    }
`