import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const LoginNav = () => {

    return (
        <ul className="navStyle">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
        </ul>
    )
}

