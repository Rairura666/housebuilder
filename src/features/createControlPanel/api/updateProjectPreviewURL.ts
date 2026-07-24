import { supabase } from "../../../shared/api/supabase"
import { Project } from "../../../shared/types/types"

export const updateProjectPreviewURL = async (project: Project | null, previewFilePath: string) => {

    if (!project) return

    const { error } = await supabase
        .from("projects")
        .update({
            project_preview_path: previewFilePath
        })
        .eq("id", project.id)


    if (error) {
        console.log(error)
    }
}