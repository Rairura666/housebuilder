import { projectPreviewProps } from "../types"

export const ProjectPreview = ({project}: projectPreviewProps) => {
    console.log(project)
        console.log("gsd")
    return(<div className="projectPreview">
    I'm a {project.project_name}
    </div>)
}