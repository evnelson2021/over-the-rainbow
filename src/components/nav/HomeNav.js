import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const HomeNav = () => {
    // const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">Login</Link>
            </li>
        </ul>
    )
}






// Just some logic that I was exploring:

// import { NavBar } from "./NavBar"
// import "./NavBar.css"
// import { useLocation } from "react-router-dom";



// export const TestingNav1 = () => {
//     const location = useLocation()
// 	// location = window.location.pathname

// 	if (location.pathname === `http://localhost:3000/activities`){
// 		// return specific navbar
// 		return <NavBar />
// 	}
// 	else {
// 		// return something else
// 		return <></>
// 	}
// }

// useHistory()
// useLocation()

// how to query: 
// `http://localhost:3000/activities`
// `/activities`
// "activities"