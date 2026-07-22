import { ProjectPreview } from "../../../shared/ProjectPreview/ui/ProjectPrewiew"
import "../../../app/styles/ProjectList.css"
import { ProfileProjectsListProps, Project } from "../../../shared/types/types"
import { useEffect, useState } from "react"
import { supabase } from "../../../shared/api/supabase"
import { useAuth } from "../../../shared/auth/useAuth"
import { loadProjects } from "../api/loadProjects"
import { deleteProject } from "../api/deleteProject"

export const ProfileProjectsList = ({ onProjectSelect }: ProfileProjectsListProps) => {

    const { user } = useAuth()

    const [projects, setProjects] = useState<Project[]>([])

    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteProject(projectId)
        }
        catch (error) {
            throw error
        }

        setProjects(prev => prev.filter(project => project.id !== projectId))
    }

    useEffect(() => {

        if (!user) return

        loadProjects(user.id, setProjects)

        const channel = supabase
            .channel("projects")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "projects",
                },
                (payload) => {
                    console.log(payload)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])

    return (
        <div className="profileProjectList">
            {projects.map(project =>
                <ProjectPreview
                    key={project.id}
                    project={project}
                    onProjectSelect={onProjectSelect}
                    deleteProject={() => handleDeleteProject(project.id)}
                />)}
        </div>
    )
}