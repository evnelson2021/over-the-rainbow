import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Schedule.css"


export const AddScheduleForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
        
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

    // useEffect(() => {
    //     fetch(`http://localhost:8088/schedules?_expand=user`)
    //       .then((res) => res.json())
    //       .then((schedulesArray) => {
    //         setSchedules(schedulesArray)
    //       })
    //   }, [])


   

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const scheduleToSendToAPI = {
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            notes: schedule.notes,
            userId: rainbowUserObject.id
        } 

        // TODO: Perform the fetch() to POST the object to the API
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
                navigate("/schedule")
            })
        } else {
                alert('Please complete the form')
              }
    }

    return (
        <form className="scheduleForm">
            <h2 className="scheduleForm__title">New Schedule Change</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
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
                {/* create a separate component that will deal with the date the way I want it to, then import that into the components I need so it will deal with the date  */}
                {/* write helper function to reformat the date to display properly */}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">End Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
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
                    <label htmlFor="start-time">Start Time:</label>
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
                    <label htmlFor="end-time">End Time:</label>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Schedule Notes:</label>
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

            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="btn btn-primary">
                Submit Schedule Change
            </button>
        </form>
    )
} 