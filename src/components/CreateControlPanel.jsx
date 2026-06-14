export const CreateControlPanel = ({undo, redo}) => {
    return(
        <>
            <button>Open file</button>
            <button>Save</button>
            <button>Transform</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </>
    )
}