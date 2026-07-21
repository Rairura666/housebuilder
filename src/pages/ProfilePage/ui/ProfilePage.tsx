import { ProfileUserInfo } from "../../../widgets/ProfileUserInfo"
import { ProfileProjectsList } from "../../../features/ProfileProjectsList/ui/ProfileProjectsList"
import "../../../app/styles/ProfilePage.css"
import { useProfile } from "../../../entities/profile/model/useProfile"
import { useAuth } from "../../../shared/auth/useAuth"
import { useNavigate } from "react-router-dom"
import { Project } from "../../../shared/types/types"

export const ProfilePage = () => {

    const navigate = useNavigate()

    const { user } = useAuth()
    const { profile, handleLogOut } = useProfile(user)

    const handleProjectSelect = (project: Project) => {
        navigate("/create", {
            state: {
                project: project,
            },
        })
    }

    return (
        <div className="profilePageWrapper">
            <div className="profileUserHeader">
                <ProfileUserInfo profile={profile} />
                <button
                    onClick={handleLogOut}
                >Log out</button>
            </div>
            <div className="profileProjectsList">
                <ProfileProjectsList onProjectSelect={handleProjectSelect} />
            </div>
        </div>
    )
}

