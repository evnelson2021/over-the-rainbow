import Axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {Record} from 'cloudinary-react'

export const AddRecordForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    const [recordSelected, setRecordSelected] = useState("")
    const [record, setRecord] = useState ({
        picName: "",
        description: "",
        userId: rainbowUserObject.id,
        image: ""
    })

    const navigate = useNavigate()

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
                picName: record.picName,
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
                    setTimeout(() => navigate("/records"), 2000)
                })
        })
    }}

    
    return (
        <>
    
        <form className="recordForm">
        <h2 className="recordForm__title">New Record</h2>
            <fieldset>
                <div className="form-group">
                    <label className="pic-text" htmlFor="name">Record Name:</label>
                        <input
                        required
                        type="text"
                        className="pic-control"
                        placeholder="Name of Record"
                        value={record.picName}
                        onChange={
                            (evt)=> {
                                const copy = {...record}
                                copy.picName = evt.target.value
                                setRecord(copy)
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
                        className="pic-control"
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


