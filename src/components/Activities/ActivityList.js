import { useState, useEffect } from "react"
import "./Activities.css"


// export const ActivityList = ( {searchTermState} ) => {

export const ActivityList = ( ) => {
    const [activities, setActivities] = useState ([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
    // const [filteredActivities, setFiltered] = useState([])

    // useEffect(
    //     () => {
    //         const searchedActivities = activities.filter(activity => {
    //             return activity.description.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFiltered(searchedActivities)
    //     },
    //     [ searchTermState ]
    // )


  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    fetch(`http://localhost:8088/activities?_expand=kid`)
      .then((res) => res.json())
      .then((activitiesArray) => {
        setActivities(activitiesArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

      // "date": "2022-12-06"
    
      const formatDate = (activity) => {
        let formattedDate = activity.date.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }
// compare array index [0] year, assign to older or newer, 
  return (
    
    <>
    <div className="kid-name">
        <h2>Maverick</h2>
        <h2>Adaline</h2>
    </div>
    <div className="activities-container">
    {/* <h2>Maverick</h2> */}
      {activities.map((activityObj) => {
              // Can I write a for loop here for activities after declaring html="<h2>Maverick</h2> and use html+= for the rest? Then return html?"
        if (activityObj.kidId === 1)
        return (
          <div className="activity-card" key={activityObj.id}>
            <div className="kid1-activities">
                <h3 className="activity-name">{activityObj.name}</h3>
                <p className="activity-details">Location: {activityObj.location}</p>
                <p className="activity-details"> Date/Day of Week: {formatDate(activityObj)}</p>
                <p className="activity-details">Time: {activityObj.startTime}</p>
                <p className="activity-details">Time: {activityObj.endTime}</p>
                </div>
          </div>
        )
      })}
    
    {/* <h2>Adaline</h2> */}
      {activities.map((activityObj) => {
        if (activityObj.kidId === 2)
        return (
          <div className="activity-card" key={activityObj.id}>

            <div className="kid2-activities">
                <h3 className="activity-name">{activityObj.name}</h3>
                <p className="activity-details">Location: {activityObj.location}</p>
                <p className="activity-details"> Date/Day of Week: {formatDate(activityObj)}</p>
                <p className="activity-details">Time: {activityObj.startTime}</p>
                <p className="activity-details">Time: {activityObj.endTime}</p>
                </div>
          </div>
        )
      })}
    </div>
    </>
  )
}

// export const ActivityList = ( {searchTermState} ) => {
//     const [activities, setActivities] = useState ([])
// }



// const getAllActivities = () => {
//     fetch(`http://localhost:8088/activities`)
//             .then(response => response.json())
//             .then((activityArray) => {
//                 setActivities(activityArray)
//             })
// }

// useEffect(
//     () => {
//         getAllActivities()

//         fetch(`http://localhost:8088/activities`)
//             .then(response => response.json())
//             .then((activityArray) => {
//                 setActivities(activityArray)
//             })
//         // console.log("Initial state of activities", activities) // View the initial state of activities
//     },
//     [] // When this array is empty, you are observing initial component state
// )