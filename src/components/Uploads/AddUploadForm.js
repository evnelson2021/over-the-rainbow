import Axios from 'axios'
import { useState } from 'react'
import {Image} from 'cloudinary-react'

export function AddUploadForm() {

    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = () =>{
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "hh4v83ta")

        Axios.post("https://api.cloudinary.com/v1_1/evnelson2021/image/upload", formData)
        .then((response)=>
        console.log(response))
    }

    return (<>
        <div>New Upload Form will go here</div>

        <div>
            <input 
                type="file" 
                onChange={(event) => {
                    setImageSelected(event.target.files[0])
                }} 
            /> 
            <button onClick={uploadImage}> Upload Image </button>

            <Image 
            style={{width: 200}}
            cloudName="evnelson2021"
            // publicId= 
            // publicId="https://res.cloudinary.com/evnelson2021/image/upload/v1672263684/sva07jvy1h416iix8djf.jpg"
            />
        </div>
    </>)
}
