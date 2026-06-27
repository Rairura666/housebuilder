import "./Css/GeneralPageWrapper.css"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"


export const MainLayout = () => {
    return(
        <div className="mainLayout">
            <NavBar/>
            <div className="pageWrapper">    
                <Outlet/>
            </div>
        </div>
    )
}
