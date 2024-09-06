import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SelectBoxDiv } from './styles';
import { CustomButton } from '../../../../../shared/components/Buttons/styles';

export const SelectBox = ({checked, onCheck} : {checked:boolean, onCheck : () => void}) => {
    
    return(
        <SelectBoxDiv>
            <CustomButton onClick={onCheck}>
                {checked ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
            </CustomButton>
        </SelectBoxDiv>
    )
}