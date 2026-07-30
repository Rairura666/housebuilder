import "../../../app/styles/CreateControlPanel.css"
import {createControlPanelProps} from "../../../shared/types/types"


export const CreateControlPanel = ({undo, redo, handleSaveProject, setIsModalOpened, handleCreateNewProject}: createControlPanelProps) => {
    
    return(
        <div className="createControlPanelWrapper">
            
            <button onClick={handleCreateNewProject}>New Project</button>
            <button onClick={()=>setIsModalOpened(true)}>Open Project</button>
            <button onClick={handleSaveProject}>Save Project</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}