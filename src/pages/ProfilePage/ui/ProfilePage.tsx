import { ProfileUserInfo } from "../../../widgets/ProfileUserInfo"
import { ProfileProjectsList } from "../../../features/ProfileProjectsList"
import "../../../app/styles/ProfilePage.css"
import { profilePageProps } from "../../../shared/types/types"
import { useProfile } from "../../../entities/profile/model/useProfile"

export const ProfilePage = ({user}:profilePageProps) => {
    
const {profile, handleLogOut} = useProfile(user)
    
    return(
        <div className="profilePageWrapper">
            <div className="profileUserHeader">
                <ProfileUserInfo user={user} profile={profile}/>
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

