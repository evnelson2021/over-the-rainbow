import { useState, useEffect } from "react"


export const ActivityList = ( {searchTermState} ) => {
    const [activities, setActivities] = useState ([])
}

useEffect(
    () => {
        const searchedActivities = activities.filter(activity => {
            return activity.description.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFiltered(searchedActivities)
    },
    [ searchTermState ]
)

const getAllActivities = () => {
    fetch(`http://localhost:8088/activities?_embed=userActivities`)
            .then(response => response.json())
            .then((activityArray) => {
                setActivities(activityArray)
            })
}

useEffect(
    () => {
        getAllActivities()

        fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        // console.log("Initial state of activities", activities) // View the initial state of activities
    },
    [] // When this array is empty, you are observing initial component state
)