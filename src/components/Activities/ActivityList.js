import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./Activities.css"

  const localRainbowUser = localStorage.getItem("rainbow_user")
  const rainbowUserObject = JSON.parse(localRainbowUser)

export const ActivityList = ( { searchTermState } ) => {
    const [activities, setActivities] = useState ([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
    const [filteredActivities, setFiltered] = useState([])
    // const navigateToAddActivity = () => {
    //   Navigate("/activities/add-activity")
    // }
    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedActivities = activities.filter
            (activity => {
                return activity.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedActivities)
        },
        [ searchTermState ]
    )

    useEffect(
      () => {
          setFiltered(activities)
      },
      [activities]
  )


  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    fetch(`http://localhost:8088/activities?_expand=kid&_expand=user&_sort=date`)
      .then((res) => res.json())
      .then((activitiesArray) => {
        setActivities(activitiesArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  const getAllActivities = () => {
    fetch(`http://localhost:8088/activities?_expand=kid&_expand=user&_sort=date`)
      .then((res) => res.json())
      .then((activitiesArray) => {
        setActivities(activitiesArray)
      })
  }

  const deleteButton = (id) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/activities/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    getAllActivities()
                })
        }} className="schedule_delete">Delete</button>
}

      // "date": "2022-12-06"
    
      const formatDate = (activity) => {
        let formattedDate = activity.date.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }

    const formatStartTime = (activity) => {
      let formattedTime = activity.startTime.split(":")
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

  const formatEndTime = (activity) => {
    let formattedTime = activity.endTime.split(":")
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

//     const parseInt(time) = date.getTime("the date")
// if(time>12){
// time -= 12
// return time
// }else{
// return time
// }

// compare array index [0] year, assign to older or newer, 
  return (
    <>
    <div className="top-of-activities">
      <h1 className="activities-title">Activities</h1>
      <button className="add_button" onClick={() => navigate("/activities/add-activity")}>New Activity</button>
    </div>

    <div className="kid-name">
        <p>Maverick</p>
        <p>Adaline</p>
    </div>
    
    <div className="activities-container">
      <div className="kid1-list">
      {filteredActivities.map((activityObj) => {
        if (activityObj.kidId === 1)
        return (
          <div className="activity-card" key={activityObj.id}>
            <div className="kid1-activities">
            <div className="each-activity">
                <h3 className="activity-name">{activityObj.name}</h3>
                <p className="activity-details">Location: {activityObj.location}</p>
                <p className="activity-details"> Date: {formatDate(activityObj)}</p>
                <p className="activity-details">Time: {formatStartTime(activityObj)} to {formatEndTime(activityObj)}</p>
                <p>Submitted by: {activityObj.user.fullName}</p>
                </div>
                {
                rainbowUserObject.id === activityObj.userId
                    ? <> 
                    <button className="edit_button" onClick={() => navigate(`/activities/edit-activity/${activityObj.id}`)}>Edit Activity</button>

                    {deleteButton(activityObj.id)}
                    </>
                    :<>
                    </>
                }
                    
                
              </div>
              </div>

        )
      })}
      </div>
    
      <div className="kid2-list">
      {filteredActivities.map((activityObj) => {
        if (activityObj.kidId === 2)
        return (
          <div className="activity-card" key={activityObj.id}>

            <div className="kid2-activities">
            <div className="each-activity">
                <h3 className="activity-name">{activityObj.name}</h3>
                <p className="activity-details">Location: {activityObj.location}</p>
                <p className="activity-details"> Date: {formatDate(activityObj)}</p>
                <p className="activity-details">Time: {formatStartTime(activityObj)} to {formatEndTime(activityObj)}</p>
                <p>Submitted by: {activityObj.user.fullName}</p>
                </div>
                {
                rainbowUserObject.id === activityObj.userId
                    ? <> 
                    <div className="card-buttons">
                    <button className="edit_button" onClick={() => navigate(`/activities/edit-activity/${activityObj.id}`)}>Edit Activity</button>

                    {deleteButton(activityObj.id)}
                    </div>
                    </>
                    :<>
                    </>
                }
            </div>
          </div>
        )
      })}
      </div>
    </div>
    </>
  )
}