import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Dash.css"


export const Dashboard = () => {
    const navigate = useNavigate()
    
    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    const [user, setUser] = useState([])

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${rainbowUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            setUser(userObject)
        })
    }, [])

    return (
        <>
        <h1 className="welcome">Welcome, {user.fullName}</h1>
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
            <li className="Uploads__item active">
                <Link className="upload__link" to="/gallery">Gallery</Link>
            </li>
        </ol>
        </>
)
}