import "../../../app/styles/CreateControlPanel.css"
import {createControlPanelProps} from "../../../shared/types/types"


export const CreateControlPanel = ({undo, redo, handleSaveProject, setIsModalOpened}: createControlPanelProps) => {
    
    return(
        <div className="createControlPanelWrapper">
            <button onClick={()=>setIsModalOpened(true)}>Open project</button>
            <button onClick={handleSaveProject}>Save project</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}