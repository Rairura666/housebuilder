import { getProject } from "../../../features/createControlPanel/api/getProject"

export const handleProjectSelect = (projectId: string | null) => {
    if(!projectId)return

    const project = getProject(projectId)
    
    
}