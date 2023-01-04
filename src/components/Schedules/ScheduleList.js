import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Schedule.css"


export const ScheduleList = ( ) => {
    const [schedules, setSchedules] = useState ([])

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    
    const navigate = useNavigate()
    const {scheduleId} = useParams()

  useEffect(
    () => {
    fetch(`http://localhost:8088/schedules?_expand=user&_sort=startDate`)
      .then((res) => res.json())
      .then((schedulesArray) => {
        setSchedules(schedulesArray)
      })
  }, [])

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
        } else {
          return(formattedTime.join(":") + " AM")
        }
      }

    const formatEndTime = (schedule) => {
      let formattedTime = schedule.endTime.split(":")
      formattedTime = [formattedTime[0],formattedTime[1]]
      if(
        formattedTime[0] > 12
      ) {
        formattedTime[0] = formattedTime[0] - 12
        return(formattedTime.join(":") + " PM")
      } else {
        return(formattedTime.join(":") + " AM")
      }
    }

  return (
    <>
    <div className="schedule-container">
    
    <div className="top-of-schedules">
      <h1 className="schedule-title">Schedule</h1>
      <button className="add_button" onClick={() => navigate("/schedule/add-schedule")}>New Schedule Item</button>
    </div>

      {schedules.map((scheduleObj) => {
        schedules.sort(function(a,b){
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
                
                </>
                :<>
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

