import { canvasElement } from '../../../shared/types/types';
import { User } from "@supabase/supabase-js"
import { Project } from "../../../shared/types/types"
import { supabase } from "../../../shared/api/supabase"

    
export const saveProject = async(user: User | null, project: Project | undefined, canvasElements: canvasElement[]) => {
        if(!user) return

        if(!project) {
            await supabase
            .from("projects")
            .insert({
                user_id: user.id,
                canvas_elements: canvasElements
            })  
        }
        else {
            await supabase
            .from("projects")
            .update({
                project_name: project.project_name,
                canvas_elements: canvasElements
            })
            .eq("id", project.id)
        }
    }
