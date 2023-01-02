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
            <li className="Activities__item">
                <Link className="activity__link" to="" onClick={() => {
                    navigate("/activities")
                    refreshPage()
                }}>Activities</Link>
            </li>
            <li className="Schedules__item">
                <Link className="schedule__link" to="/schedule">Schedule</Link>
            </li>
        </ol>
        <ol className="dashboard">
            <li className="Gallery__item">
                <Link className="gallery__link" to="/gallery">Gallery</Link>
            </li>
            <li className="Records__item">
                <Link className="records__link" to="/records">Records</Link>
            </li>
        </ol>
        </>
)
}