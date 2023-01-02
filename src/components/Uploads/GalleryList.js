import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Gallery.css"

export const GalleryList = () => {
    
        const localRainbowUser = localStorage.getItem("rainbow_user")
        const rainbowUserObject = JSON.parse(localRainbowUser)

        const [pictures, setPicture] = useState([])
    
        const navigate = useNavigate()
        // const {pictureId} = useParams()
    
      // Use Effect watches for state change
      // It takes two arguments, a function and an array
      // The array is which states we want to observe
      // The function is what we want to do when that observed state changes
    useEffect(
        () => {
        fetch(`http://localhost:8088/pictures?_expand=user&_sort=startDate`)
        .then((res) => res.json())
        .then((picturesArray) => {
            setPicture(picturesArray)
        })
    }, [])
    
    const getAllPictures = () => {
        fetch(`http://localhost:8088/pictures?_expand=user`)
        .then((res) => res.json())
        .then((picturesArray) => {
            setPicture(picturesArray)
        })
    }
    
        const deleteButton = (id) => {
            return <button onClick={() => {
                fetch(`http://localhost:8088/pictures/${id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllPictures()
                    })
            }} className="picture_delete">Delete</button>
    }
    

        return (
        <>
        <div className="picture-container">
        
        <div className="top-of-pictures">
            <h1 className="picture-title">Gallery</h1>
            <button className="add_button" onClick={() => navigate("/gallery/add-picture")}>New Picture</button>
        </div>
            
        <div className="picture-grid">
            {pictures.map((pictureObj) => {
            return (
            <div className="all-picture-cards">
                <div className="picture-card" key={pictureObj.id}>
                <div className="picture" key={pictureObj.id}>
                    <h3 className="picture-name">{pictureObj.picName}</h3>
                    <img className="picture-image" src={pictureObj.image}/>
                    <p className="picture-details"> {pictureObj.description}</p>
                    <p>Submitted by: {pictureObj.user.fullName}</p>
                </div>
                
    
                {
                rainbowUserObject.id === pictureObj.userId
                    ? <> 
                    <button className="edit_button" onClick={() => navigate(`/gallery/edit-picture/${pictureObj.id}`)}>Edit Picture</button>
    
                    
                    {deleteButton(pictureObj.id)}
                    
    
    
                    {/* <button className="delete_button" onClick={() => ("/activities")}>Delete Activity</button> */}
                    </>
                    :<>
                    {/* Can I put code in the ELSE part of this ternary statement to "accept or decline" the change? */}
                    </>
                }    
                </div>
            </div>
        

    
            )
        })}
        </div>
        </div>
        </>
    )
}