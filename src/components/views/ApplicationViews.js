import { Outlet, Route, Routes } from "react-router-dom"


export const ApplicationViews = () => {
	return <>
		<Routes>
            <Route path="/" element={
                <>
                    <h1>Somewhere Over the Rainbow</h1>
                    <div>Keep your co-parenting skies blue.</div>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={ <></> } />
                <Route path="tickets" element={ <></> } />
                <Route path="employees" element={ <></> } />		
                <Route path="employees/:employeeId" element={ <></> } />	
            </Route>
        </Routes>
	</>
}