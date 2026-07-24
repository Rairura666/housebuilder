import { supabase } from "../api/supabase"

export const getPreviewURL = async  (path: string) => { 


    const { data, error } = await supabase.storage
        .from("ProjectPreviews")
        .createSignedUrl(
            path,
            60 * 60
        )


    if(error){
        console.log(error)
        return null
    }


    return data.signedUrl
}