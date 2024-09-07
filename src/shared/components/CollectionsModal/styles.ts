import styled from "@emotion/styled";
import { CustomInput, CustomTextArea } from "../Inputs/styles";
import Checkbox from '@mui/material/Checkbox';

export const ModalPh = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const ModalBox = styled.div`
    position: relative;
    padding: 10px 1vw;
    background-color: #32256A;
    color: white;

    width: 20vw;
    min-width: 300px;
`

export const ListModalBox = styled.div`
    position: relative;
    padding: 10px 1vw;
    background-color: #32256A;
    color: white;

    width: 15vw;
    min-width: 300px;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export const CreateForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 10px);
    height: 100%;
    gap: 10px;
    margin: 8px 0;
`

export const FormLabel = styled.span`
    display: block;
    color:white;
    margin-bottom: 3px;
`

export const FormControl = styled.div`
    width: 100%;
`

export const FormInput = styled(CustomInput)`
    width: 100%;
`

export const FormTextArea = styled(CustomTextArea)`
    width: 100%;
`

export const ColList = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
    border: solid 1px rgba(255,255,255, .7);
    padding: 10px 10px;
    max-height: 30vh;
    overflow-y: auto;
`

export const ColListEl = styled.li`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    flex-wrap: wrap;

    &:hover {
        background-color: rgba(255,255,255, .2);
        cursor: pointer;
    }
`

export const SearchInput = styled(CustomInput)`
    background-color: transparent;
    border-bottom: solid 1px rgba(255,255,255, .7);
    color: white;
    border-radius: 0px;
    width: calc(100% - 10px);

    &:focus {
        border-bottom: solid 2px white;
    }
`

export const ListCheckbox = styled(Checkbox)`
`

