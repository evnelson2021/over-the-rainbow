import { useState } from "react"
import { ActivityList } from "./ActivityList"
import { ActivitySearch } from "./ActivitySearch"

export const ActivityContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ActivitySearch setterFunction={setSearchTerms}/>
		<ActivityList searchTermState={searchTerms}/>
    </>
}