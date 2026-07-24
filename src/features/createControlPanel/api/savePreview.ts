import { User } from "@supabase/supabase-js"
import { supabase } from "../../../shared/api/supabase"
import { Project } from "../../../shared/types/types"

export const savePreview = async (user: User | null, project: Project | null, blobPreview: Blob) => {

    if (!user || !project) return

    const filePath = `${user.id}/ProjectPreviews/${project.id}`

    const { error } = await supabase.storage
        .from("ProjectPreviews")
        .upload(filePath, blobPreview, {
            contentType: "image/png",
            upsert: true,
        })

    if (error) {
        console.log(error)
        return
    }

    console.log(filePath)
    return filePath

}