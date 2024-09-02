import styled from "@emotion/styled";
import { CustomButton } from "../../../../shared/components/Buttons/styles";

export const ActionButtonsDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    background-color: #181134;
    height: 40px;
    width: 170px;
    border-radius: 15px;
`

export const ActionButton = styled(CustomButton)`
    color: white;

    &:hover {
        color: #D217E2
    }
`