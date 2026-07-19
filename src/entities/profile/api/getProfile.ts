import { supabase } from "../../../shared/api/supabase";

export const getProfile = async(userId: string) => {
    const {data, error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

     if (error) {
        throw error
    }

    return data
}