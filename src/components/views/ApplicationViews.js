import { Outlet, Route, Routes } from "react-router-dom"
import { UpdateProfileForm } from "../profile/ProfileEdit"


export const ApplicationViews = () => {
	return <>
		<Routes>
            <Route path="/" element={
                <>
                    <h1>Somewhere Over the Rainbow</h1>
                    <div>Keeping your co-parenting skies blue since 2022.</div>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={ <UpdateProfileForm /> } />
                <Route path="tickets" element={ <></> } />
                <Route path="employees" element={ <></> } />		
                <Route path="employees/:employeeId" element={ <></> } />	
            </Route>
        </Routes>
	</>
}

