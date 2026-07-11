import { ProjectPreview } from "./ProjectPrewiew"
import "../Css/ProjectList.css"
import { profileProjectsList, Project } from "../types"
import { useEffect, useState } from "react"
import { supabase } from "../../utils/supabase"

export const ProfileProjectsList = ({user}: profileProjectsList) => {
    
    const [projects, setProjects] = useState<Project[]>([])
    
    useEffect(() => {

        if (!user) return

        const loadProjects = async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("user_id", user.id)

            if (data) {
                setProjects(data)
            }
            console.log(data)
            console.log(user.id)
            console.log(error)
        }

        loadProjects()

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

    return(
        <div className="profileProjectList">
        {projects.map(project => <ProjectPreview project={project}/>)}
        </div>
    )
}