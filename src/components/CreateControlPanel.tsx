import "../Css/CreateControlPanel.css"

export const CreateControlPanel = ({undo, redo}) => {
    return(
        <div className="createControlPanelWrapper">
            <button>Open project</button>
            <button>Save project</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}