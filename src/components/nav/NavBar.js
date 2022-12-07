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
                <Link className="navbar__link" to="activities/edit-activity">Edit Activities</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="activities/add-activity">Add Activities</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/schedule">Parenting Schedule</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="schedule/edit-schedule">Edit Schedule</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="schedule/add-schedule">Add Scheduled Time</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/dash">Dashboard</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="edit-profile">Edit My Profile</Link>
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
    )
}

