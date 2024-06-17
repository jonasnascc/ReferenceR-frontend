import styled from "@emotion/styled";

export const InputContainer = styled.form<{navbar?:boolean}>`
    display: flex;
    min-width: 100%;
    ${props => props.navbar&&`
        flex: 1;
        min-width: 200px;
        max-width: 400px;
    `}
    align-items: center;
    justify-content: center;
    padding: 1vw;
`

export const TextFieldContainer = styled.div<{navbar?:boolean, fullWidth?:boolean}>`
    position: relative;
    display: flex;
    flex: 1;
    border: solid 1px rgba(255,255,255, .8);
    border-radius: 5px;
    ${props => `
        max-width: ${props.navbar ? "370px" : 
            (props.fullWidth ? "100%" : "auto")};
        ${props.fullWidth&&"min-width:100%;"}
    `}
    z-index: 5;
`

export const SearchTextField = styled.input`
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    color: white;
    box-shadow: none;
    outline: none;
    height:25px;
    padding: 0 5px 0 1vw;
    &:focus, &:active {
        border: none;
        background-color: transparent;
    }
    z-index: 5;

`
