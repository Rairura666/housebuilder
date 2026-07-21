import { supabase } from "../../../shared/api/supabase"

export const getProject = async (projectId: string) => {

     const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single()

    if (error) {
        throw error
    }

    return data
}