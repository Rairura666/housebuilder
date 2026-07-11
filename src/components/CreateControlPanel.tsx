import "../Css/CreateControlPanel.css"
import {createControlPanelProps} from "../types"


export const CreateControlPanel = ({undo, redo, saveProject}: createControlPanelProps) => {
    return(
        <div className="createControlPanelWrapper">
            <button >Open project</button>
            <button onClick={saveProject}>Save project</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}