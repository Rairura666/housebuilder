import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../shared/api/supabase";
import { Profile } from "../../../shared/types/types";
import { getProfile } from "../api/getProfile";

export const useProfile = (user: User | null) => {
    
    const [profile, setProfile] = useState<Profile | null>(null);
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            console.log("Logged out!")
            return null
        } catch (e) {
            throw e
        }
    }

 useEffect(() => {
        if (!user) {
            navigate("/")
            return
        }

        const loadProfile = async () => {
            const profile = await getProfile(user.id)
            setProfile(profile)
        }

        loadProfile()
    }, [user, navigate])

    return {profile, handleLogOut}
}