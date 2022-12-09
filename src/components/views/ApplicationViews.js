import { Outlet, Route, Routes } from "react-router-dom"
import { ActivityContainer } from "../Activities/ActivityContainer"
// import { ActivityList } from "../Activities/ActivityList"
import { UpdateProfileForm } from "../profile/ProfileEdit"
import { AddActivityForm } from "../Activities/AddActivityForm"
import { ActivityEditForm } from "../Activities/ActivityEdit"
import { Login } from "../auth/Login"
import { AddScheduleForm } from "../Schedules/AddScheduleForm"
import { Home } from "../home/Home"
import { ScheduleEditForm } from "../Schedules/ScheduleEdit"
import { ScheduleList } from "../Schedules/ScheduleList"



export const ApplicationViews = () => {
	return <>
		<Routes>
            <Route path="*" element={
                <>
                    <h1>Over the Rainbow</h1>
                    <div>Keeping your co-parenting skies blue since 2022.</div>
                    {/* try navbar here */}
                    <Outlet />
                </>
            }>
                <Route path="*" element={ <Home /> } />
                <Route path="login" element={ <Login /> } />
                <Route path="edit-profile" element={ <UpdateProfileForm /> } />
                <Route path="dash" element={ <></> } />
                <Route path="activities" element={ <ActivityContainer /> } />
                <Route path="/activities/edit-activity/:activityId" element={ <ActivityEditForm /> } />
                <Route path="activities/add-activity" element={ <AddActivityForm /> } />
                <Route path="schedule" element={ <ScheduleList /> } />
                <Route path="/schedule/edit-schedule/:scheduleId" element={ <ScheduleEditForm /> } />
                <Route path="schedule/add-schedule" element={ <AddScheduleForm /> } />

            
                {/* <Route path="employees/:employeeId" element={ <></> } />	 */}
            </Route>
            {/* try another route here and navbar 2 with associated routes/paths */}
        </Routes>
	</>
}

