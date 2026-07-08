import "./Css/GeneralPageWrapper.css"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { mainLayoutProps } from "./types"


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
