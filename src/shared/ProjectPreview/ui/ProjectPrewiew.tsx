import { projectPreviewProps } from "../../types/types"
import "./ProjectPreview.css"
import { useEffect, useState } from "react"
import { getPreviewURL } from "../getPreviewURL"

export const ProjectPreview = ({ project, onProjectSelect, deleteProject }: projectPreviewProps) => {

    const [projectPreviewURL, setProjectPreviewURL] = useState<string | null>(null)


    useEffect(() => {
        if (!project.project_preview_path)
            return

        getPreviewURL(project.project_preview_path).then(setProjectPreviewURL)
        
    }, [project.project_preview_path])

    return (<div className="projectPreviewWrapper">
        <button
            className="projectPreview"
            onClick={() => onProjectSelect(project)}>
            {projectPreviewURL ?
                <img src={projectPreviewURL}></img>
                : <div>Empty project</div>
            }

        </button>

        <button
            className="deleteProjectButton"
            onClick={() => deleteProject(project.id)}
        >Delete</button>

        <span className="projectPreviewName">{project.project_name}</span>
    </div>)
}