import "../app/styles/GeneralPageWrapper.css"
import { Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"

export const MainLayout = () => {
    return(
        <div className="mainLayout">
            <NavBar />
            <div className="pageWrapper">    
                <Outlet/>
            </div>
        </div>
    )
}
