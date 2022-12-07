import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Dashboard = () => {
    return (
        <ol className="dashboard">
            <li className="dash__item active">
                <Link className="navbar__link" to="/activities">Activities</Link>
            </li>
            <li className="dash__item active">
                <Link className="navbar__link" to="/schedole">Parenting Schedule</Link>
            </li>
        </ol>
)
}

