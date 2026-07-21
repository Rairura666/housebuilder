import { projectPreviewProps } from "../../types/types"

export const ProjectPreview = ({ project, onProjectSelect }: projectPreviewProps) => {

    return (<div className="projectPreview">
        <button onClick={()=>onProjectSelect(project)}> I'm a {project.project_name}</button>
    </div>)
}