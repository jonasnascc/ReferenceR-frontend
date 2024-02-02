import { Switch } from '@mui/material'
import React from 'react'


export const ExpandSwitch = ({onChange} : {onChange: (event:any) => any}) => {


    return (
        <>
            <Switch onChange={onChange}/>
        </>
    )
}
