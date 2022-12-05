import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/activities">Activities</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/edit-activities">Edit Activities</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/schedule">Parenting Schedule</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/edit-schedule">Edit Schedule</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/profile">Edit My Profile</Link>
            </li>
            {
                localStorage.getItem("rainbow_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("rainbow_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>

        // <ul className="navbar">
        //     <li className="navbar__item navbar__logout">
        //         <Link className="navbar__link" to="" onClick={() => {
        //             localStorage.removeItem("rainbow_user")
        //             navigate("/", {replace: true})
        //         }}>Logout</Link>
        //     </li>
        // </ul>
    )
}

