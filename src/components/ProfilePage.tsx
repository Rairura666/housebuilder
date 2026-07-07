import { ProfileUserInfo } from "./ProfileUserInfo"
import { ProfileProjectsList } from "./ProfileProjectsList"
import "../Css/ProfilePage.css"
import { supabase } from "../../utils/supabase"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
    
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            console.log("Logged out!")
            navigate("/")
            return null
        } catch (e) {
            throw e
        }
    }
    
    return(
        <div className="profilePageWrapper">
            <div className="profileUserHeader">
                <ProfileUserInfo />
                <button
                onClick={handleLogOut}
                >Log out</button>
            </div>
            <div className="profileProjectsList">
                <ProfileProjectsList />   
            </div>
        </div>
    )
}