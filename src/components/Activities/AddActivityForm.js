import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddActivityForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [activity, addActivity] = useState({
        name: "",
        location: "",
        date: "",
        time: "",
        kidId: 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the activity list
    */

    const navigate = useNavigate()

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const activityToSendToAPI = {
            userId: rainbowUserObject.id,
            description: activity.description,
            emergency: activity.emergency,
            dateCompleted: ""
        } 

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceActivities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/activities")
            })
    }

    return (
        <form className="activityForm">
            <h2 className="activityForm__title">New Service Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={activity.description}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.description = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={activity.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.emergency = evt.target.checked
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="btn btn-primary">
                Submit Activity
            </button>
        </form>
    )
}