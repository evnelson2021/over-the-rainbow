import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Records.css"

export const RecordEditForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

const [record, setRecord] = useState({
    recordName: "",
    description: "",
    userId: rainbowUserObject.id,
    image: ""
})
const [feedback, setFeedback] = useState("")
const navigate = useNavigate()
const {recordId} = useParams()

    // TODO: Get user record info from API and update state
useEffect(() => {
    fetch(`http://localhost:8088/records?id=${recordId}`)
    .then(response => response.json())
    .then((data) => {
        setRecord(data[0])
    })
}, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the record.
            Navigate user to home page when done.
        */

            fetch(`http://localhost:8088/records/${record.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(record)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Record changes successfully saved")
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
        <form className="record">
            <h2 className="record-title">Update Record Information</h2>
            <fieldset>
                <div className="form-group">
                    <label className="record-text" htmlFor="name">Record Name:</label>
                        <textarea
                        required
                        type="text"
                        className="record-control"
                        placeholder="Name of Record"
                        value={record.recordName}
                        onChange={
                            (evt)=> {
                                const copy = {...record}
                                copy.recordName = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="record-text" htmlFor="location">Description:</label>
                    <textarea
                        required
                        type="text"
                        className="description-box"
                        placeholder="Description of Record"
                        value={record.description}
                        onChange={
                            (evt)=> {
                                const copy = {...record}
                                copy.description = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="save-button">
                Save Record
            </button>
        </form>
        </>
    )
}