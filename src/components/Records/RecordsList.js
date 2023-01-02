import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Records.css"

export const RecordsList = () => {
    
        const localRainbowUser = localStorage.getItem("rainbow_user")
        const rainbowUserObject = JSON.parse(localRainbowUser)

        const [records, setRecord] = useState([])
    
        const navigate = useNavigate()

    useEffect(
        () => {
        fetch(`http://localhost:8088/records?_expand=user&_sort=startDate`)
        .then((res) => res.json())
        .then((recordsArray) => {
            setRecord(recordsArray)
        })
    }, [])
    
    const getAllRecords = () => {
        fetch(`http://localhost:8088/records?_expand=user`)
        .then((res) => res.json())
        .then((recordsArray) => {
            setRecord(recordsArray)
        })
    }
    
        const deleteButton = (id) => {
            return <button onClick={() => {
                fetch(`http://localhost:8088/records/${id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllRecords()
                    })
            }} className="record_delete">Delete</button>
    }
    

        return (
        <>
        <div className="record-container">
        
        <div className="top-of-records">
            <h1 className="record-title">Records</h1>
            <button className="add_button" onClick={() => navigate("/records/add-record")}>New Record</button>
        </div>
            
        <div className="record-grid">
            {records.map((recordObj) => {
            return (
            <div className="all-record-cards">
                <div className="record-card" key={recordObj.id}>
                <div className="record" key={recordObj.id}>
                    <h3 className="record-name">{recordObj.picName}</h3>
                    <img className="record-image" src={recordObj.image}/>
                    <p className="record-details"> {recordObj.description}</p>
                    <p>Submitted by: {recordObj.user.fullName}</p>
                </div>
                
    
                {
                rainbowUserObject.id === recordObj.userId
                    ? <> 
                    <button className="edit_button" onClick={() => navigate(`/records/edit-record/${recordObj.id}`)}>Edit Record</button>
    
                    
                    {deleteButton(recordObj.id)}
                    
    
    
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