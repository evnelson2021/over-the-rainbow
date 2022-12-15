import "./Activities.css"

export const ActivitySearch = ({ setterFunction }) => {
    return(
        <div>
            <input className="search-box"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }    
            type="text" placeholder="Search Activities" />
            </div>
    )
}