import styled from "@emotion/styled";
import { CustomInput, CustomTextArea } from "../Inputs/styles";

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

    width: 30vw;
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