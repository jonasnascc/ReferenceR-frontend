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
            <button onClick={onSelectAll} disabled={selectingAll}>Select all</button>
            {
                selected.length > 0 &&(
                    <>
                    <button onClick={onAddToCollection}>Add to collection</button>
                    </>
                )
            }
        </div>
    )
}