import { Link } from "react-router-dom"
import "../Css/NavBar.css"

export const NavBar = () => {
    return (
        <div className="navBarWrapper">
        <Link to="/" className="navBarBtn mainPageBtn">Main</Link>
        <Link to="/create" className="navBarBtn createPage">Create</Link>
        <Link to="/profile" className="navBarBtn profileBtn">Profile</Link>
        </div>
    )
}
