import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {Record} from 'cloudinary-react'

export const AddRecordForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    const [recordSelected, setRecordSelected] = useState("")
    const [record, setRecord] = useState ({
        recordName: "",
        description: "",
        userId: rainbowUserObject.id,
        image: ""
    })

    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")

    const uploadRecord = (event) => {
        if (recordSelected) {
            event.preventDefault()
            console.log("Your record has been uploaded")
        const formData = new FormData()
        formData.append("file", recordSelected)
        formData.append("upload_preset", "hh4v83ta")

        Axios.post("https://api.cloudinary.com/v1_1/evnelson2021/image/upload", formData)
        .then((response) => {
            console.log(response.data.url)
            const recordToSendToAPI = {
                recordName: record.recordName,
                description: record.description,
                userId: rainbowUserObject.id,
                image: response.data.url
                }


            return fetch("http://localhost:8088/records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recordToSendToAPI)})
                .then(response => response.json())
                .then(() => {
                    setFeedback("Record Upload Successful")
                })
                .then(() => {
                    setTimeout(() => navigate("/records"), 2000)
                })
        })
    }}

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
    
        <form className="recordForm">
        <h2 className="recordForm__title">New Record</h2>
            <fieldset>
                <div className="form-group">
                    <label className="record-text" htmlFor="name">Record Name:</label>
                        <input
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
                        className="record-control"
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
    
        <div>
            <input 
                type="file" 
                onChange={(event) => {
                    setRecordSelected(event.target.files[0])
                }} 
            /> 
            

            {/* <Record 
            style={{width: 200}}
            cloudName="evnelson2021" 
            // publicId= 
            // publicId="https://res.cloudinary.com/evnelson2021/record/record/v1672263684/sva07jvy1h416iix8djf.jpg"
            />*/}

        </div>
        <button onClick={uploadRecord}> Upload Record </button>
        </form>

        </>
    )
}


