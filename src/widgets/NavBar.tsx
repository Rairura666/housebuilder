import { Link } from "react-router-dom"
import "../app/styles/NavBar.css"
import { navBarProps } from "../shared/types/types"

export const NavBar = ({user}:navBarProps) => {
    return (
        <div className="navBarWrapper">
        <Link to="/" className="navBarBtn mainPageBtn">Main</Link>
        {user ?
            <Link to="/create" className="navBarBtn createPage">Create</Link>
            : null
        }
         {user ?
            <Link to="/profile" className="navBarBtn profileBtn">Profile</Link>
            : <Link to="/signin" className="navBarBtn profileBtn">Sign in</Link>
        }

        </div>
    )
}
