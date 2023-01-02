import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ShowGalleryLogoutNav = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    return (
        <ul className="navStyle">
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/gallery">Back to Gallery</Link>
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