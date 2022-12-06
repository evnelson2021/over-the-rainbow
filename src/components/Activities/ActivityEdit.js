import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ActivityEditForm = () => {
    // TODO: Provide initial state for profile
const [activity, updateActivity] = useState({
    name: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    kidId: 0
})
const [feedback, setFeedback] = useState("")

const navigate = useNavigate()

// const localRainbowUser = localStorage.getItem("rainbow_user")
//     const rainbowUserObject = JSON.parse(localRainbowUser)

    // TODO: Get activity info from API and update state
useEffect(() => {
    fetch(`http://localhost:8088/activities`)
    .then(response => response.json())
    .then((data) => {
        const activityObject = data[0]
        updateActivity(activityObject)
    })
}, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the activity.
            Navigate user to home page when done.
        */

            fetch(`http://localhost:8088/activities/${activity.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(activity)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Activity changes successfully saved")
            })
        }

        
        useEffect(() => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000)
                .then(() => {
                    navigate("/activities")
                })
            }
        }, [feedback])


    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="activity">
            <h2 className="activity__title">Update Activity Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={activity.fullName}
                        onChange={
                            (evt) => {
                                // TODO: Update name property
                                const copy = {...activity}
                                copy.name = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text"
                        className="form-control"
                        value={activity.address}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.address = evt.target.value 
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={activity.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.phoneNumber = evt.target.value 
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text"
                        className="form-control"
                        value={activity.email}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.email = evt.target.value 
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Activity
            </button>
        </form>
        </>
    )
}