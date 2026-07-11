import { ProfileUserInfo } from "./ProfileUserInfo"
import { ProfileProjectsList } from "./ProfileProjectsList"
import "../Css/ProfilePage.css"
import { supabase } from "../../utils/supabase"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { profilePageProps, Profile } from "../types"

export const ProfilePage = ({user}:profilePageProps) => {
    
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
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            if (error) {
                console.error(error)
                return
            }

            setProfile(data)
        }

        loadProfile()
    }, [user, navigate])
    
    return(
        <div className="profilePageWrapper">
            <div className="profileUserHeader">
                <ProfileUserInfo user={user} profile={profile} setProfile={setProfile}/>
                <button
                onClick={handleLogOut}
                >Log out</button>
            </div>
            <div className="profileProjectsList">
                <ProfileProjectsList user={user}/>   
            </div>
        </div>
    )
}