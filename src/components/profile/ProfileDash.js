import { Link, useNavigate } from "react-router-dom"


export const Dashboard = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    return (
        <ol className="dashboard">
            <li className="dash__item active">
                <Link className="navbar__link" to="" onClick={() => {
                    navigate("/activities")
                    refreshPage()
                }}>Activities</Link>
            </li>
            <li className="dash__item active">
                <Link className="navbar__link" to="/schedule">Parenting Schedule</Link>
            </li>
        </ol>
)
}

