import styled from "@emotion/styled";

export const InputContainer = styled.form`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    max-width: 400px;
    padding: 1vw;
`

export const TextFieldContainer = styled.div`
    display: flex;
    flex: 1;
    border: solid 1px rgba(255,255,255, .8);
    border-radius: 10px;
    max-width: 370px;
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
    &:focus{
        border: none;
    }
`