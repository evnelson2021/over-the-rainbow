import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
// import { Register } from "./auth/Register"
import "./Rainbow.css"
import { Home } from "./home/Home"
import { HomeNav } from "./nav/HomeNav"
import { Login } from "./auth/Login"
import { LoginNav } from "./nav/LoginNav"
import { ActivityEditForm } from "./Activities/ActivityEdit"
import { ActivityEditNav } from "./nav/ActivityEditNav"

import { DashNav } from "./nav/DashNav"
import { ShowDashLogoutNav } from "./nav/ShowDashLogoutNav"
import { UpdateProfileForm } from "./profile/ProfileEdit"
import { Dashboard } from "./profile/ProfileDash"
import { AddActivityForm } from "./Activities/AddActivityForm"
import { AddScheduleForm } from "./Schedules/AddScheduleForm"
import { ActivityContainer } from "./Activities/ActivityContainer"


export const OverRainbow = () => {
	return <Routes>
		<Route path="/home" element={<Home />} />
		<Route path="/login" element={<Login />} />
		{/* <Route path="/register" element={<Register />} /> */}

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />

		<Route path="/home" element={
			<Authorized>
			<>
				<HomeNav />
				<Home />
			</>
		</Authorized>
			
		} />

		<Route path="/login" element={
			<Authorized>
			<>
				<LoginNav />
				<Login />
			</>
		</Authorized>
			
		} />

		<Route path="/dash" element={
			<Authorized>
			<>
				<DashNav />
				<Dashboard />
			</>
		</Authorized>
			
		} />

		<Route path="/edit-profile" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<UpdateProfileForm />
			</>
		</Authorized>
			
		} />
		

		<Route path="/activities" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<ActivityContainer />
			</>
		</Authorized>
			
		} />

		<Route path="/activities/add-activity" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<AddActivityForm />
			</>
		</Authorized>
			
		} />

		<Route path="/schedule/add-schedule" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<AddScheduleForm />
			</>
		</Authorized>
			
		} />
{/* 
		<Route path="/activities/edit-activity" element={
			<Authorized>
			<>
				<ActivityEditNav />
				<ActivityEditForm />
			</>
		</Authorized>
			
		} />

<Route path="/activities/edit-activity" element={
			<Authorized>
			<>
				<ActivityEditNav />
				<ActivityEditForm />
			</>
		</Authorized>
			
		} />

		<Route path="/activities/edit-activity" element={
			<Authorized>
			<>
				<ActivityEditNav />
				<ActivityEditForm />
			</>
		</Authorized>
			
		} /> */}
	</Routes>
}

// ShowDashLogoutNav