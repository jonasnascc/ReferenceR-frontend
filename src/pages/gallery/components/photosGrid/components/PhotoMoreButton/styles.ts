import styled from "@emotion/styled";
import { CustomButton } from "../../../../../../shared/components/Buttons/styles";

export const ButtonDiv = styled.div`
    position:absolute;
    width: 100%;
`

export const MoreButton = styled(CustomButton)`
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 27px;
    height: 27px;
    transition: background-color .1s ease-in-out;
    
    border-radius: 50%;

    &:hover{
        background-color: rgba(255,255,255,.2);
    }

    &:active{
        background-color: rgba(255,255,255,.5);
    }
`

export const OptionsList = styled.ul`
    list-style: none;
    padding: 0;
`

export const PhotoOption = styled.li`
    display: flex;
    align-items: center;
    padding: 8px 1vw;
    &:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,.2);
    }
`