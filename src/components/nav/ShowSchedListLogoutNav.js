import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ShowSchedListLogoutNav = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }
    

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/schedule">Back to Parenting Schedule</Link>
            </li>
            {
                localStorage.getItem("rainbow_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            refreshPage()
                            localStorage.removeItem("rainbow_user")
                            navigate("*", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}