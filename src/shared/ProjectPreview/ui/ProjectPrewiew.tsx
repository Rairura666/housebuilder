import { projectPreviewProps } from "../../types/types"
import "../../../app/styles/ProjectPreview.css"

export const ProjectPreview = ({ project, onProjectSelect, deleteProject }: projectPreviewProps) => {

    return (<div className="projectPreviewWrapper">
        <button 
        className="projectPreview" 
        onClick={()=>onProjectSelect(project)}> 
        I'm a {project.project_name}</button>

        <button 
        className="deleteProjectButton"
        onClick={()=>deleteProject(project.id)}
        >Delete</button>
    </div>)
}