import { projectPreviewProps } from "./types/types"

export const ProjectPreview = ({project}: projectPreviewProps) => {
  
    return(<div className="projectPreview">
    I'm a {project.project_name}
    </div>)
}