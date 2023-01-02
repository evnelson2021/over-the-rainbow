import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Gallery.css"

export const UploadEditForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

const [picture, setPicture] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        notes: "",
        userId: rainbowUserObject.id
})
const [feedback, setFeedback] = useState("")
const navigate = useNavigate()
const {pictureId} = useParams()

    // TODO: Get user picture info from API and update state
useEffect(() => {
    fetch(`http://localhost:8088/pictures?id=${pictureId}`)
    .then(response => response.json())
    .then((data) => {
        setPicture(data[0])
    })
}, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the picture.
            Navigate user to home page when done.
        */

            fetch(`http://localhost:8088/pictures/${picture.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(picture)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Picture changes successfully saved")
            })
            .then(() => {
                    setTimeout(() => navigate("/gallery"), 3000);
        })
    }
        
        useEffect(() => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        }, [feedback])

    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="picture">
            <h2 className="picture-title">Update Picture Information</h2>
            <fieldset>
                <div className="form-group">
                    <label className="pic-text" htmlFor="name">Picture Name:</label>
                        <textarea
                        required
                        type="text"
                        className="pic-control"
                        placeholder="Name of Picture"
                        value={picture.picName}
                        onChange={
                            (evt)=> {
                                const copy = {...picture}
                                copy.picName = evt.target.value
                                setPicture(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="pic-text" htmlFor="location">Description:</label>
                    <textarea
                        required
                        type="text"
                        className="description-box"
                        placeholder="Description of Picture"
                        value={picture.description}
                        onChange={
                            (evt)=> {
                                const copy = {...picture}
                                copy.description = evt.target.value
                                setPicture(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="save-button">
                Save Picture
            </button>
        </form>
        </>
    )
}