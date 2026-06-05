import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <>
        <Link to="/" className="mainPageBtn">main</Link>
        <Link to="/create" className="createPage">Create</Link>
        <Link to="/profile" className="profileBtn">prof</Link>
        </>
    )
}
