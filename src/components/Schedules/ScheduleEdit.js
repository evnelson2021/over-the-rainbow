import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Schedule.css"

export const ScheduleEditForm = () => {
    // TODO: Provide initial state for schedule
    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

const [schedule, setSchedule] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        notes: "",
        userId: rainbowUserObject.id
})
const [feedback, setFeedback] = useState("")
const navigate = useNavigate()
const {scheduleId} = useParams()

    // TODO: Get user schedule info from API and update state
useEffect(() => {
    fetch(`http://localhost:8088/schedules?id=${scheduleId}`)
    .then(response => response.json())
    .then((data) => {
        setSchedule(data[0])
    })
}, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the schedule.
            Navigate user to home page when done.
        */

            fetch(`http://localhost:8088/schedules/${schedule.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(schedule)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Schedule changes successfully saved")
            })
            .then(() => {
                    setTimeout(() => navigate("/schedule"), 3000);
        })
    }
        
        useEffect(() => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        }, [feedback])

    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="schedule">
            <h2 className="schedule__title">Update Schedule Information</h2>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="date">Start Date:</label>
                    <input
                        required
                        type="date"
                        className="sched-control"
                        placeholder="Date of Schedule"
                        defaultValue={schedule.startDate} 
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.startDate = evt.target.value
                                setSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="date">End Date:</label>
                    <input
                        required
                        type="date"
                        className="sched-control"
                        placeholder="Date of Schedule"
                        value={schedule.endDate} 
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.endDate = evt.target.value
                                setSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="start-time">Start Time:</label>
                    <input
                        required
                        type="time"
                        className="sched-control"
                        placeholder="Start Time"
                        value={schedule.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.startTime = evt.target.value
                                setSchedule(copy)
                            }
                        } />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="end-time">End Time:</label>
                    <input
                        required
                        type="time"
                        className="sched-control"
                        placeholder="End Time"
                        value={schedule.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.endTime = evt.target.value
                                setSchedule(copy)
                            }
                        } />
                </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="notes">Schedule Notes:</label>
                    <input
                        required
                        type="text"
                        className="notes-box"
                        placeholder="Explanation of schedule change or travel"
                        value={schedule.notes}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.notes = evt.target.value
                                setSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="save-button">
                Save Schedule
            </button>
        </form>
        </>
    )
}


// TO SAVE WHILE TESTING THE ON CLICK SAVE:
// "schedules": [
//     {
//       "id": 1,
//       "startDate": "",
//       "endDate": "",
//       "startTime": "",
//       "endTime": "",
//       "notes": "Christmas Vacation - Louisiana Trip",
//       "userId": 1
//     },
//     {
//       "id": 1,
//       "startDate": "",
//       "endDate": "",
//       "startTime": "",
//       "endTime": "",
//       "notes": "Spring Break - going to Florida",
//       "userId": 2
//     },
//     {
//       "id": 1,
//       "startDate": "",
//       "endDate": "",
//       "startTime": "",
//       "endTime": "",
//       "notes": "Christmas Vacation",
//       "userId": 1
//     }
//   ]