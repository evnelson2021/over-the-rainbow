import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {Image} from 'cloudinary-react'

export const AddUploadForm = () => {

    const localRainbowUser = localStorage.getItem("rainbow_user")
    const rainbowUserObject = JSON.parse(localRainbowUser)

    const [imageSelected, setImageSelected] = useState("")
    const [picture, setPicture] = useState ({
        picName: "",
        description: "",
        userId: rainbowUserObject.id,
        image: ""
    })

    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")

    const uploadImage = (event) => {
        if (imageSelected) {
            event.preventDefault()
            console.log("Your image has been uploaded")
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "hh4v83ta")

        Axios.post("https://api.cloudinary.com/v1_1/evnelson2021/image/upload", formData)
        .then((response) => {
            console.log(response.data.url)
            const pictureToSendToAPI = {
                picName: picture.picName,
                description: picture.description,
                userId: rainbowUserObject.id,
                image: response.data.url
                }


            return fetch("http://localhost:8088/pictures", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pictureToSendToAPI)})
                .then(response => response.json())
                .then(() => {
                    setFeedback("New Upload Successful")
                })
                .then(() => {
                    setTimeout(() => navigate("/gallery"), 2000)
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
    
        <form className="pictureForm">
        <h2 className="pictureForm__title">New Picture</h2>
            <fieldset>
                <div className="form-group">
                    <label className="pic-text" htmlFor="name">Picture Name:</label>
                        <input
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
                        className="pic-control"
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
    
        <div>
            <input 
                type="file" 
                onChange={(event) => {
                    setImageSelected(event.target.files[0])
                }} 
            /> 
            

            {/* <Image 
            style={{width: 200}}
            cloudName="evnelson2021" 
            // publicId= 
            // publicId="https://res.cloudinary.com/evnelson2021/image/upload/v1672263684/sva07jvy1h416iix8djf.jpg"
            />*/}

        </div>
        <button onClick={uploadImage}> Upload Image </button>
        </form>

        </>
    )
}


