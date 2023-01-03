import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Schedule.css"


export const ScheduleList = ( ) => {
    const [schedules, setSchedules] = useState ([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    
    const navigate = useNavigate()
    const {scheduleId} = useParams()

  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(
    () => {
    fetch(`http://localhost:8088/schedules?_expand=user&_sort=startDate`)
      .then((res) => res.json())
      .then((schedulesArray) => {
        setSchedules(schedulesArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  const getAllSchedules = () => {
    fetch(`http://localhost:8088/schedules?_expand=user&_sort=startDate`)
      .then((res) => res.json())
      .then((schedulesArray) => {
        setSchedules(schedulesArray)
      })
  }

  const deleteButton = (id) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/schedules/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    getAllSchedules()
                })
        }} className="schedule_delete">Delete</button>
}

      // "date": "2022-12-06"
    
      const formatStartDate = (schedule) => {
        let formattedDate = schedule.startDate.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }

      const formatEndDate = (schedule) => {
        let formattedDate = schedule.endDate.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }

      const formatStartTime = (schedule) => {
        let formattedTime = schedule.startTime.split(":")
        formattedTime = [formattedTime[0],formattedTime[1]]
        if(
          formattedTime[0] > 12
        ) {
          formattedTime[0] = formattedTime[0] - 12
          return(formattedTime.join(":") + " PM")
          // formattedTime = [formattedTime[0],formattedTime[1]]
        } else {
          return(formattedTime.join(":") + " AM")
        }
        // return(formattedTime.join(":"))
      }

    const formatEndTime = (schedule) => {
      let formattedTime = schedule.endTime.split(":")
      formattedTime = [formattedTime[0],formattedTime[1]]
      if(
        formattedTime[0] > 12
      ) {
        formattedTime[0] = formattedTime[0] - 12
        return(formattedTime.join(":") + " PM")
        // formattedTime = [formattedTime[0],formattedTime[1]]
      } else {
        return(formattedTime.join(":") + " AM")
      }
      // return(formattedTime.join(":"))
    }

    
// compare array index [0] year, assign to older or newer, 
  return (
    <>
    <div className="schedule-container">
    
    <div className="top-of-schedules">
      <h1 className="schedule-title">Schedule</h1>
      <button className="add_button" onClick={() => navigate("/schedule/add-schedule")}>New Schedule Item</button>
    </div>

      {schedules.map((scheduleObj) => {
        schedules.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        });
        return (
          <div className="all-sched-cards">
          <div className="schedule-card" key={scheduleObj.id}>
            <div className="schedule">
                <h3 className="schedule-name">{scheduleObj.notes}</h3>
                <p className="schedule-details"> From {formatStartDate(scheduleObj)} at {formatStartTime(scheduleObj)} through {formatEndDate(scheduleObj)} at {formatEndTime(scheduleObj)}</p>
                <p>Submitted by: {scheduleObj.user.fullName}</p>
            </div>
            

            {
            rainbowUserObject.id === scheduleObj.userId
                ? <> 
                <button className="edit_button" onClick={() => navigate(`/schedule/edit-schedule/${scheduleObj.id}`)}>Edit Schedule</button>

                
                {deleteButton(scheduleObj.id)}
                


                {/* <button className="delete_button" onClick={() => ("/activities")}>Delete Activity</button> */}
                </>
                :<>
                {/* Can I put code in the ELSE part of this ternary statement to "accept or decline" the change? */}
                </>
            }    
            </div>
          </div>
          

        )
      })}
    </div>
    </>
  )
}

