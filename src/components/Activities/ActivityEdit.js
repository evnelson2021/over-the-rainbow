import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const ActivityEditForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

const [activity, setActivity] = useState({
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
const {activityId} = useParams()


    useEffect(() => {
        fetch(`http://localhost:8088/activities?id=${activityId}`)
        .then(response => response.json())
        .then((data) => {
            setActivity(data[0])
        })
    }, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

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
            .then(() => {
                setTimeout(() => navigate("/activities"), 3000);
            })
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

        <form className="activityEditForm">
            <h2 className="activityEdit__title">Edit Activity Information</h2>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="name">Activity Name:</label>
                    <input
                        type="text"
                        className="act-control"
                        placeholder="Name of Activity"
                        defaultValue={activity?.name}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.name = evt.target.value
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="location">Activity Location:</label>
                    <input
                        type="text"
                        className="act-control"
                        placeholder="Location of Activity"
                        defaultValue={activity?.location}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.location = evt.target.value
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="date">Activity Date:</label>
                    <input
                        type="date"
                        className="act-control"
                        placeholder="Date of Activity"
                        defaultValue={activity?.date} 
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.date = evt.target.value
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="start-time">Activity Start Time:</label>
                    <input
                        type="time"
                        className="act-control"
                        placeholder="Start Time"
                        defaultValue={activity?.startTime}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.startTime = evt.target.value
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="end-time">Activity End Time:</label>
                    <input
                        type="time"
                        className="act-control"
                        placeholder="End Time"
                        defaultValue={activity?.endTime}
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.endTime = evt.target.value
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="name">Maverick:</label>
                    <input type="radio"
                        name="kid"
                        checked={activity.kidId === 1}
                        value="1"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                setActivity(copy)
                            }
                        } />
                    <label className="act-text" htmlFor="name">Adaline:</label>
                    <input type="radio"
                        name="kid"
                        checked={activity.kidId === 2}
                        value="2"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                setActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="save-button">
                Save Activity
            </button>
        </form>
        </>
    )
}