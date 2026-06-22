import { ProfileUserInfo } from "./ProfileUserInfo"
import { ProfileProjectsList } from "./ProfileProjectsList"
import "../Css/ProfilePage.css"

export const ProfilePage = () => {
    return(
        <div className="profilePageWrapper">
            <div className="profileUserHeader">
                <ProfileUserInfo />
            </div>
            <div className="profileProjectsList">
                <ProfileProjectsList />   
            </div>
        </div>
    )
}