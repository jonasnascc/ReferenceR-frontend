import React from "react";

type SelectedPhotosActionsProps = {
    selected : string[],
    onAddToCollection : () => void,
    onSelectAll : () => void,
    selectingAll ?: boolean
}

export const SelectedPhotosActions = ({selected, onAddToCollection, onSelectAll, selectingAll=false} : SelectedPhotosActionsProps) => {
    return (
        <div>
            <button onClick={onSelectAll} disabled={selectingAll&&selected.length===0}>Select all</button>
            {
                (selected.length > 0 || selectingAll) && (
                    <>
                    <button onClick={onAddToCollection}>Add to collection</button>
                    </>
                )
            }
        </div>
    )
}