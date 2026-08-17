import { ProfileUserInfo } from "../../../widgets/ProfileUserInfo/ui/ProfileUserInfo"
import { ProjectsList } from "../../../features/ProfileProjectsList/ui/ProjectsList"
import "./ProfilePage.css"
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
            <div className="profileUserPanel">
                <ProfileUserInfo profile={profile} />
                <div className="profileUserControlBtns">
                    <button
                        className="">
                        Settings</button>

                    <button
                        onClick={handleLogOut}
                    >Log out</button>
                </div>
            </div>
            <div className="profileProjectsList">
                <label>Your projects</label>
                <ProjectsList onProjectSelect={handleProjectSelect} closeModal={()=>{}}/>
            </div>
        </div>
    )
}

