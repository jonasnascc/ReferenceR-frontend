import styled from "@emotion/styled";
import React from "react";
import { Timer } from "./Timer";


type ControlPanelProps = {
    onTimerReset : () => void
}

export const ControlPanel = ({onTimerReset} : ControlPanelProps) => {
    return (
        <Panel>
            <Timer onTimerReset={onTimerReset}/>
        </Panel>
    )
}

const Panel = styled.div`
    height: 100%;
    width: 100%;
    background-color: #D9D9D9;
`