import { ReactNode } from "react"
import { ControlPanelExpandButton } from "../../../../shared/components/ControlPanelExpandButton/ControlPanelExpandButton"
import { ControlPanelProps } from "../ControlPanel/ControlPanel"
import { FooterCtrlPanelBar } from "./styles"

type FooterControlPanelProps = ControlPanelProps&{
    children ?: ReactNode
}

export const FooterControlPanel = (props : FooterControlPanelProps) => {

    const {
        reset=false, 
        blockTimer, 
        footerActive, 
        onToggleFooter, 
        onNextPhoto, 
        onPreviousPhoto, 
        onBlockTimer, 
        onReseted, 
        onProgressChange, 
        currentAlbum, 
        currentPhotoTitle,
        children
    } = props

    return (
        <>
        <ControlPanelExpandButton active={footerActive} handleClick={onToggleFooter}/>
        <FooterCtrlPanelBar>
            {children}
        </FooterCtrlPanelBar>
        </>
    )
}
