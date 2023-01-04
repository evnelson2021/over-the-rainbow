import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const HomeNav = () => {

    return (
        <ul className="navStyle">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">Login</Link>
            </li>
        </ul>
    )
}