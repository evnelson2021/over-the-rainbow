import { useState, useEffect } from "react"
// import "./Schedule.css"


export const ScheduleList = ( ) => {
    const [schedule, setSchedule] = useState ([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable


  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    fetch(`http://localhost:8088/schedule?_expand=user`)
      .then((res) => res.json())
      .then((scheduleArray) => {
        setSchedule(scheduleArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

      // "date": "2022-12-06"
    
      const formatDate = (schedule) => {
        let formattedDate = schedule.date.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }
// compare array index [0] year, assign to older or newer, 
  return (
    <>
    <div className="schedule-container">
    
      {schedule.map((scheduleObj) => {
        return (
          <div className="schedule-card" key={scheduleObj.id}>

            <div className="schedule">
                <h3 className="schedule-name">{scheduleObj.name}</h3>
                <p className="schedule-details">Location: {scheduleObj.location}</p>
                <p className="schedule-details"> Date/Day of Week: {formatDate(scheduleObj)}</p>
                <p className="schedule-details">Time: {scheduleObj.startTime}</p>
                <p className="schedule-details">Time: {scheduleObj.endTime}</p>
                </div>
          </div>
        )
      })}
    </div>
    </>
  )
}