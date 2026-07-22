import { supabase } from "../../../shared/api/supabase";

export const deleteProject = async (projectId: string) => {
    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

    if (error) {
        throw error;
    }
}