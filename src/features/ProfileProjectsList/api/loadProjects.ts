
import { Dispatch, SetStateAction } from "react"
import { supabase } from "../../../shared/api/supabase"
import { Project } from "../../../shared/types/types"

export const loadProjects = async (userId: string, setProjects: Dispatch<SetStateAction<Project[]>>) => {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)

    if(error) throw (error)   

    if (data) {
        setProjects(data)
    }
}
