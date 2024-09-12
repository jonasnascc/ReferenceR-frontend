import styled from "@emotion/styled";
import { CustomInput, CustomTextArea } from "../Inputs/styles";
import Checkbox from '@mui/material/Checkbox';
import { CustomButton, OutlinedButton } from "../Buttons/styles";

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
    margin: 10px 0 5px 0;
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

export const SearchInputDiv = styled.div`
    display: flex;
    width: calc(100% - 10px);
    border: solid 1px rgba(255,255,255, .7);
    border-radius: 5px;
    margin-top: 10px;
    padding: 3px .3vw;
`

export const SearchInput = styled(CustomInput)`
    background-color: transparent;
    color: white;
    flex: 1;
`

export const EmptyMessage = styled.div`
    margin-bottom: 10px;
`

export const ListCheckbox = styled(Checkbox)`
`

export const CollectionButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`



export const CollectionButton = styled(CustomButton)<{btnType:"create"|"save"}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
    background-color: ${props => props.btnType==="create" ? "#3D298E" : "#D217E2" };
`


