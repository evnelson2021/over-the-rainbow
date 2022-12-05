export const ActivitySearch = ({ setterFunction }) => {
    return(
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }    
            type="text" placeholder="Enter serach terms" />
            </div>
    )
}