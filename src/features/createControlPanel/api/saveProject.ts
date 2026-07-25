import { canvasElement } from '../../../shared/types/types';
import { Project } from "../../../shared/types/types"
import { supabase } from "../../../shared/api/supabase"
import { User } from '@supabase/supabase-js';

export const saveProject = async (user: User | null, project: Project | null, canvasElements: canvasElement[], projectName: string) => {

    if (!user) return

    if (!project) {
        const { data, error } = await supabase
            .from("projects")
            .insert({
                user_id: user.id,
                canvas_elements: canvasElements,
                project_name: projectName
            })
            .select()
            .single()

        if (error) {
            console.error(error)
            return
        }

        return data
    }
    else {
        const { data, error } = await supabase
            .from("projects")
            .update({
                project_name: project.project_name,
                canvas_elements: canvasElements,
            })
            .eq("id", project.id)
            .select()
            .single()

        if (error) {
            console.error(error)
            return
        }

        return data
    }
}
