import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const AddActivityForm = () => {

        const localRainbowUser = localStorage.getItem("rainbow_user")
        const rainbowUserObject = JSON.parse(localRainbowUser)

    const [activity, addActivity] = useState({
        name: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        kidId: 0,
        userId: rainbowUserObject.id
    })

    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()

    const handleBothKidsSaveButton = (event) => {
        event.preventDefault()

        const activityToSendToAPI = {
            name: activity.name,
            location: activity.location,
            date: activity.date,
            startTime: activity.startTime,
            endTime: activity.endTime,
            kidId: activity.kidId,
            userId: rainbowUserObject.id
        }

        const activityToSendToAPI1 = {
            name: activity.name,
            location: activity.location,
            date: activity.date,
            startTime: activity.startTime,
            endTime: activity.endTime,
            kidId: 1,
            userId: rainbowUserObject.id
        }

        const activityToSendToAPI2 = {
            name: activity.name,
            location: activity.location,
            date: activity.date,
            startTime: activity.startTime,
            endTime: activity.endTime,
            kidId: 2,
            userId: rainbowUserObject.id
        } 

        
        if (
            activity.name &&
            activity.location &&
            activity.date &&
            activity.startTime &&
            activity.endTime &&
            activity.kidId === 3
        ) {
        return fetch(`http://localhost:8088/activities?_expand=kid&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityToSendToAPI1)
        })
            .then (fetch(`http://localhost:8088/activities?_expand=kid&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityToSendToAPI2)
        }))
            .then(response => response.json())
            .then(() => {
                setFeedback(("New Activity Saved"), 2000)
            })
            .then(() => {
                setTimeout(() => navigate("/activities"), 2000)
            })
        } else if(
            activity.name &&
            activity.location &&
            activity.date &&
            activity.startTime &&
            activity.endTime &&
            activity.kidId
        ){
            return fetch(`http://localhost:8088/activities?_expand=kid&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback(("New Activity Saved"), 2000)
            })
            .then(() => {
                setTimeout(() => navigate("/activities"), 2000)
            })
        } else {
            alert('Please complete the form')
        }
    }

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
            }
    }, [feedback])

    return (
        <>
        
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        
        <form className="activityForm">
            <h2 className="activityForm__title">New Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="name">Activity Name:</label>
                    <input
                        required
                        type="text"
                        className="act-control"
                        placeholder="Name of Activity"
                        value={activity.name}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.name = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="location">Activity Location:</label>
                    <input
                        required
                        type="text"
                        className="act-control"
                        placeholder="Location of Activity"
                        value={activity.location}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.location = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="date">Activity Date:</label>
                    <input
                        required
                        type="date"
                        className="act-control"
                        placeholder="Date of Activity"
                        value={activity.date} 
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.date = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="start-time">Activity Start Time:</label>
                    <input
                        required
                        type="time"
                        className="act-control"
                        placeholder="Start Time"
                        value={activity.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.startTime = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="end-time">Activity End Time:</label>
                    <input
                        required
                        type="time"
                        className="act-control"
                        placeholder="End Time"
                        value={activity.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.endTime = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="name">Maverick:</label>
                    <input type="radio"
                        name="kid"
                        value="1"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                addActivity(copy)
                            }
                        } />
                    <label className="act-text" htmlFor="name">Adaline:</label>
                    <input type="radio"
                        name="kid"
                        value= "2"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                addActivity(copy)
                            }
                        } />
                        <label className="act-text" htmlFor="name">Both:</label>
                        <input type="radio"
                        name="kid"
                        value= "3"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                addActivity(copy)
                            }
                        } /> 
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleBothKidsSaveButton(clickEvent) }
            className="save-button">
                Submit Activity
            </button>
            {/* <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="save-button">
                Submit Activity
            </button> */}
        </form>
        </>
    )
}
