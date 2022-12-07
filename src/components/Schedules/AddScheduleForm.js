import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const AddScheduleForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [schedule, addSchedule] = useState({
        name: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        kidId: 0
    })

    // const [kids, setKids] = useState([])
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the schedule list
    */

    const navigate = useNavigate()

    // useEffect(() => {
    //     fetch(`http://localhost:8088/schedules?_expand=kid`)
    //       .then((res) => res.json())
    //       .then((schedulesArray) => {
    //         setSchedules(schedulesArray)
    //       })
    //   }, [])

    // const now = new Date();
    // const dateString = now.toLocaleDateString({
    //     weekday: "short",
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "numeric"
    //     })

    // const localRainbowUser = localStorage.getItem("rainbow_user")
    // const rainbowUserObject = JSON.parse(localRainbowUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const scheduleToSendToAPI = {
            name: schedule.name,
            location: schedule.location,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            kidId: schedule.kidId
        } 

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/schedules?_expand=kid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(scheduleToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/schedules")
            })
    }

    return (
        <form className="scheduleForm">
            <h2 className="scheduleForm__title">New Schedule</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Schedule Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Schedule"
                        value={schedule.name}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.name = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Schedule Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Location of Schedule"
                        value={schedule.location}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.location = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Schedule Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Date of Schedule"
                        value={schedule.date} 
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.date = evt.target.value
                                addSchedule(copy)
                            }
                        } />
                </div>
                {/* create a separate component that will deal with the date the way I want it to, then import that into the components I need so it will deal with the date  */}
                {/* write helper function to reformat the date to display properly */}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start-time">Schedule Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
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
                    <label htmlFor="end-time">Schedule End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
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
                    {/* <label htmlFor="kidId">Kid(s)</label><br></br>
                    <select>
                        <option 
                        required autoFocus
                        type="checkbox" 
                        id="kidId" 
                        className="form-control"
                        value={schedule.kidId}
                        onChange={
                            (evt)=> {
                                const copy = {...schedule}
                                copy.kidId = evt.target.checked
                                addSchedule(copy)
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
                        value={schedule.kidId === 1}
                        onChange={
                            (evt) => {
                                const copy = {...schedule}
                                copy.kidId = evt.target.checked
                                addSchedule(copy)
                            }
                        } />
                        <label htmlFor="name">Adaline:</label>
                        <input type="checkbox"
                        value={schedule.kidId === 2}
                        onChange={
                            (evt) => {
                                const copy = {...schedule}
                                copy.kidId = evt.target.checked
                                addSchedule(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="btn btn-primary">
                Submit Schedule
            </button>
        </form>
    )
}