import { useState, useEffect } from "react"

export const ActivityList = () => {
    const [activities, setActivities] = useState ([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable

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

  return (
    <>
    <div className="activities-container">
      {activities.map((activityObj) => {
        if (activityObj.kidId === 1)
        return (
          <div className="activity-card" key={activityObj.id}>
            <h2>{activityObj.kid.name}</h2>
            <div className="activity-name">{activityObj.name}</div>
          </div>
        )
      })}
    </div>

    
    <div className="activities-container">
      {activities.map((activityObj) => {
        if (activityObj.kidId === 2)
        return (
          <div className="activity-card" key={activityObj.id}>
            <h2>{activityObj.kid.name}</h2>
            <div className="activity-name">{activityObj.name}</div>
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

// useEffect(
//     () => {
//         const searchedActivities = activities.filter(activity => {
//             return activity.description.toLowerCase().startsWith(searchTermState.toLowerCase())
//         })
//         setFiltered(searchedActivities)
//     },
//     [ searchTermState ]
// )

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