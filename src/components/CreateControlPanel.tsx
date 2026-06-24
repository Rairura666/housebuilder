import "../Css/CreateControlPanel.css"
import {createControlPanelProps} from "../types"


export const CreateControlPanel = ({undo, redo}: createControlPanelProps) => {
    return(
        <div className="createControlPanelWrapper">
            <button>Open project</button>
            <button>Save project</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}