import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Schedule.css"


export const AddScheduleForm = () => {

        const localRainbowUser = localStorage.getItem("rainbow_user")
        const rainbowUserObject = JSON.parse(localRainbowUser)

    const [schedule, addSchedule] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        notes: "",
        userId: rainbowUserObject.id
    })

    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const scheduleToSendToAPI = {
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            notes: schedule.notes,
            userId: rainbowUserObject.id
        } 

        if (
            schedule.startDate &&
            schedule.endDate &&
            schedule.startTime &&
            schedule.endTime &&
            schedule.notes &&
            schedule.userId
        ) {
            fetch(`http://localhost:8088/schedules?_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(scheduleToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback(("New Schedule Saved"), 2000)
            })
            .then(() => {
                setTimeout(() => navigate("/schedule"), 2000)
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
        
        <form className="scheduleForm">
            <h2 className="scheduleForm__title">New Schedule Change</h2>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="date">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="sched-control"
                        placeholder="Date of Schedule"
                        value={schedule.startDate} 
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.startDate = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="date">End Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="sched-control"
                        placeholder="Date of Schedule"
                        value={schedule.endDate} 
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.endDate = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="start-time">Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="sched-control"
                        placeholder="Start Time"
                        value={schedule.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.startTime = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label className="sched-text" htmlFor="end-time">End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="sched-control"
                        placeholder="End Time"
                        value={schedule.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.endTime = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="sched-text" htmlFor="notes">Schedule Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="notes-box"
                        placeholder="Explanation of schedule change or travel"
                        value={schedule.notes}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.notes = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="save-button">
                Submit Schedule Change
            </button>
        </form>
        </>
    )
} 