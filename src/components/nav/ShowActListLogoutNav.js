import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ShowActListLogoutNav = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/activities">Back to Activities</Link>
            </li>
            {
                localStorage.getItem("rainbow_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            
                            localStorage.removeItem("rainbow_user")
                            navigate("*", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}