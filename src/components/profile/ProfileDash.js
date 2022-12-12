import { Link, useNavigate } from "react-router-dom"


export const Dashboard = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    return (
        <ol className="dashboard">
            <li className="Activities__item active">
                <Link className="activity__link" to="" onClick={() => {
                    navigate("/activities")
                    refreshPage()
                }}>Activities</Link>
            </li>
            <li className="Schedules__item active">
                <Link className="schedule__link" to="/schedule">Schedule</Link>
            </li>
        </ol>
)
}

