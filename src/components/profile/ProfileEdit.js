import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UpdateProfileForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    id: rainbowUserObject.id
})
const [feedback, setFeedback] = useState("")
const navigate = useNavigate()


useEffect(() => {
    fetch(`http://localhost:8088/users?id=${rainbowUserObject.id}`)
    .then(response => response.json())
    .then((data) => {
        const userObject = data[0]
        setProfile(userObject)
    })
}, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

            fetch(`http://localhost:8088/users/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Profile changes successfully saved")
            })
        }

        
        useEffect(() => {
            if (feedback !== "") {
                setTimeout(() => setFeedback(""), 3000)
            }
        }, [feedback])
        


    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile-edit">
            <h2 className="profile__title">Update Profile Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.fullName}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.fullName = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value 
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value 
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.email = evt.target.value 
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}