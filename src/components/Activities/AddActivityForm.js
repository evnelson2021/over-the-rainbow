import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const AddActivityForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

        const localRainbowUser = localStorage.getItem("rainbow_user")
        const rainbowUserObject = JSON.parse(localRainbowUser)

    const [activity, addActivity] = useState({
        name: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        kidId: 0,
        userId: rainbowUserObject.id
    })

    const [feedback, setFeedback] = useState("")

    // const [kids, setKids] = useState([])
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the activity list
    */

    const navigate = useNavigate()

    // useEffect(() => {
    //     fetch(`http://localhost:8088/activities?_expand=kid`)
    //       .then((res) => res.json())
    //       .then((activitiesArray) => {
    //         setActivities(activitiesArray)
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
        const activityToSendToAPI = {
            name: activity.name,
            location: activity.location,
            date: activity.date,
            startTime: activity.startTime,
            endTime: activity.endTime,
            kidId: activity.kidId,
            userId: rainbowUserObject.id
        } 

        // TODO: Perform the fetch() to POST the object to the API
        if (
            activity.name &&
            activity.location &&
            activity.date &&
            activity.startTime &&
            activity.endTime &&
            activity.kidId
          ) {
        return fetch(`http://localhost:8088/activities?_expand=kid&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback(("New Activity Saved"), 2000)
            })
            .then(() => {
                setTimeout(() => navigate("/activities"), 2000)
            })
        } else {
            alert('Please complete the form')
          }
    }

    // HandlebothkidsSave button that creates two separate activities with kidId 1 and 2 run POST twice
    // use radio buttons - value of 3 on third option - if id is 3, do it twice, otherwise just once with appropriate kidId

    return (
        <form className="activityForm">
            <h2 className="activityForm__title">New Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Activity Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Activity"
                        value={activity.name}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.name = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Activity Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Location of Activity"
                        value={activity.location}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.location = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Activity Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Date of Activity"
                        value={activity.date} 
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.date = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
                {/* create a separate component that will deal with the date the way I want it to, then import that into the components I need so it will deal with the date  */}
                {/* write helper function to reformat the date to display properly */}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start-time">Activity Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="Start Time"
                        value={activity.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.startTime = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="end-time">Activity End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="End Time"
                        value={activity.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.endTime = evt.target.value
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Maverick:</label>
                    <input type="checkbox"
                        value="1"
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(evt.target.value)
                                addActivity(copy)
                            }
                        } />
                    <label htmlFor="name">Adaline:</label>
                    <input type="checkbox"
                        value= "2"
                        onChange={
                            (evt) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(evt.target.value)
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Maverick:</label>
                    <input type="radio"
                        name="kid"
                        value="1"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                addActivity(copy)
                            }
                        } />
                    <label htmlFor="name">Adaline:</label>
                    <input type="radio"
                        name="kid"
                        value= "2"
                        onClick={
                            (click) => {
                                const copy = {...activity}
                                copy.kidId = parseInt(click.target.value)
                                addActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="btn btn-primary">
                Submit Activity
            </button>
        </form>
    )
}


// JUST PUTTING THIS HERE FOR LATER - MAKING A DROPDOWN - will need "Both" option with an id of 3 to add to both activity lists
{/* <label htmlFor="kidId">Kid(s)</label><br></br>
                    <select>
                        <option 
                        required autoFocus
                        type="checkbox" 
                        id="kidId" 
                        className="form-control"
                        value={activity.kidId}
                        onChange={
                            (evt)=> {
                                const copy = {...activity}
                                copy.kidId = evt.target.checked
                                addActivity(copy)
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


                // return (
                //     <div onChange={this.onChangeValue}>
                //       <input type="radio" value="Male" name="gender" /> Male
                //       <input type="radio" value="Female" name="gender" /> Female
                //       <input type="radio" value="Other" name="gender" /> Other
                //     </div>
                //   )


            //     <fieldset>
            //     <div className="form-group">
            //         <label htmlFor="name">Maverick:</label>
            //         <input type="radio"
            //             value="1"
            //             onChange={
            //                 (evt) => {
            //                     const copy = {...activity}
            //                     copy.kidId = parseInt(evt.target.value)
            //                     addActivity(copy)
            //                 }
            //             } />
            //         <label htmlFor="name">Adaline:</label>
            //         <input type="checkbox"
            //             value= "2"
            //             onChange={
            //                 (evt) => {
            //                     const copy = {...activity}
            //                     copy.kidId = parseInt(evt.target.value)
            //                     addActivity(copy)
            //                 }
            //             } />
            //     </div>
            // </fieldset>


                // return (
                //       <div className="radio">
                //         <label>
                //           <input
                //             type="radio"
                //             value="Male"
                //             checked={this.state.selectedOption === "Male"}
                //             onChange={this.onValueChange}
                //           />
                //           Male
                //         </label>
                //       </div>
                //       <div className="radio">
                //         <label>
                //           <input
                //             type="radio"
                //             value="Female"
                //             checked={this.state.selectedOption === "Female"}
                //             onChange={this.onValueChange}
                //           />
                //           Female
                //         </label>
                //       </div>
                //       <div className="radio">
                //         <label>
                //           <input
                //             type="radio"
                //             value="Other"
                //             checked={this.state.selectedOption === "Other"}
                //             onChange={this.onValueChange}
                //           />
                //           Other
                //         </label>
                //       </div>
                //       <div>
                //         Selected option is : {this.state.selectedOption}
                //       </div>
                //       <button className="btn btn-default" type="submit">
                //         Submit
                //       </button>
                //   )