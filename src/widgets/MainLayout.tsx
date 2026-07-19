import "../app/styles/GeneralPageWrapper.css"
import { Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import { mainLayoutProps } from "../shared/types/types"


export const MainLayout = ({user}: mainLayoutProps) => {
    return(
        <div className="mainLayout">
            <NavBar user={user}/>
            <div className="pageWrapper">    
                <Outlet/>
            </div>
        </div>
    )
}
