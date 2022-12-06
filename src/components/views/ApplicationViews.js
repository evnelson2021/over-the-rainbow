import { Outlet, Route, Routes } from "react-router-dom"
import { ActivityContainer } from "../Activities/ActivityContainer"
// import { ActivityList } from "../Activities/ActivityList"
import { UpdateProfileForm } from "../profile/ProfileEdit"
import { AddActivityForm } from "../Activities/AddActivityForm"
import { ActivityEditForm } from "../Activities/ActivityEdit"
import { Login } from "../auth/Login"



export const ApplicationViews = () => {
	return <>
		<Routes>
            <Route path="/" element={
                <>
                    <h1>Over the Rainbow</h1>
                    <div>Keeping your co-parenting skies blue since 2022.</div>

                    <Outlet />
                </>
            }>
                <Route path="profile" element={ <UpdateProfileForm /> } />
                <Route path="activities" element={ <ActivityContainer /> } />
                <Route path="/edit-activities" element={ <ActivityEditForm /> } />
                <Route path="/add-activities" element={ <AddActivityForm /> } />
                <Route path="schedule" element={ <></> } />
                <Route path="/edit-schedule" element={ <ActivityEditForm /> } />
                <Route path="/add-schedule" element={ <AddActivityForm /> } />

                
                <Route path="employees" element={ <></> } />		
                <Route path="employees/:employeeId" element={ <></> } />	
            </Route>
        </Routes>
	</>
}

