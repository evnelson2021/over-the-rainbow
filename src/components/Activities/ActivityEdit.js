import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


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

const { activityId } = useParams
const navigate = useNavigate()

// const localRainbowUser = localStorage.getItem("rainbow_user")
//     const rainbowUserObject = JSON.parse(localRainbowUser)

    // TODO: Get activity info from API and update state

    useEffect(() => {
        fetch (`http://localhost:8088/activities/${activityId}`)
            .then (response => response.json())
            .then ((data) => {
                updateActivity(data)
            })
    }, [ activityId ])

// useEffect(() => {
//     fetch(`http://localhost:8088/activities`)
//     .then(response => response.json())
//     .then((data) => {
//         const activityObject = data[0]
//         updateActivity(activityObject)
//     })
// }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the activity.
            Navigate user to home page when done.
        */

            fetch(`http://localhost:8088/activities?/${activity.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(activity)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback(("Activity changes successfully saved"), 3000)
            })
            .then(() => {
                navigate(("/activities"), 3000)
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

        // .then(() => {
        //     setTimeout(() => navigate("/schedule"), 4000);
        // })

    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="activity">
            <h2 className="activity__title">Update Activity Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Activity Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Activity"
                        value={activity.name}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.name = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Activity Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Location of Activity"
                        value={activity.location}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.location = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Activity Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Date of Activity"
                        value={activity.date} 
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.date = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
                {/* create a separate component that will deal with the date the way I want it to, then import that into the components I need so it will deal with the date  */}
                {/* write helper function to reformat the date to display properly */}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start-time">Activity Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="Start Time"
                        value={activity.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.startTime = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="end-time">Activity End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="End Time"
                        value={activity.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.endTime = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
                    {/* <label htmlFor="kidId">Kid(s)</label><br></br>
                    <select>
                        <option 
                        required autoFocus
                        type="checkbox" 
                        id="kidId" 
                        className="form-control"
                        value={activity.kidId}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.kidId = evt.target.checked
                                updateActivity(copy)
                            }
                        }/>
                    </select> */}

            {/* <label htmlFor="kids">Kids</label><br></br> 
            <select onChange={setKids}>
                <option value={0} type="select" id="kidId" className="form-control" required></option>
                {
                kids.map ( (kid) => {
                return <option key-"kidId--{kid. id}" value={kid.id}>{kid.name}</option>
                </select> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Maverick:</label>
                    <input type="checkbox"
                        value={activity.kidId === 1}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.kidId = evt.target.value
                                updateActivity(copy)
                            }
                        } />
                        <label htmlFor="name">Adaline:</label>
                        <input type="checkbox"
                        value={activity.kidId === 2}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.kidId = evt.target.value
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