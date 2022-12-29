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

import { DashNav } from "./nav/DashNav"
import { ShowDashLogoutNav } from "./nav/ShowDashLogoutNav"
import { UpdateProfileForm } from "./profile/ProfileEdit"
import { Dashboard } from "./profile/ProfileDash"
import { AddActivityForm } from "./Activities/AddActivityForm"
import { AddScheduleForm } from "./Schedules/AddScheduleForm"
import { ActivityContainer } from "./Activities/ActivityContainer"
import { ScheduleEditForm } from "./Schedules/ScheduleEdit"
import { ShowSchedListLogoutNav } from "./nav/ShowSchedListLogoutNav"
import { ShowActListLogoutNav } from "./nav/ShowActListLogoutNav"
import { ScheduleList } from "./Schedules/ScheduleList"
import { ShowGalleryLogoutNav } from "./nav/ShowGalleryLogoutNav"
import { GalleryList } from "./Uploads/GalleryList"
import { UploadEditForm } from "./Uploads/UploadEdit"
import { AddUploadForm } from "./Uploads/AddUploadForm"


export const OverRainbow = () => {
	return <Routes>
		<Route path="*" element={<>
				<HomeNav />
				<Home />
			</>} />
		{/* <Route path="/login" element={<Login />} /> */}
		{/* <Route path="/register" element={<Register />} /> */}

		{/* <Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} /> */}

		{/* <Route path="*" element={
			<Authorized>
			<>
				<HomeNav />
				<Home />
			</>
		</Authorized>
			
		} /> */}

		<Route path="/login" element={
			<>
				<LoginNav />
				<Login />
			</>

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

<Route path="/schedule" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<ScheduleList />
			</>
		</Authorized>
			
		} />

		<Route path="/activities/add-activity" element={
			<Authorized>
			<>
				<ShowActListLogoutNav />
				<AddActivityForm />
			</>
		</Authorized>
			
		} />

		<Route path="/schedule/add-schedule" element={
			<Authorized>
			<>
				<ShowSchedListLogoutNav />
				<AddScheduleForm />
			</>
		</Authorized>
			
		} />

		<Route path="/activities/edit-activity/:activityId" element={
			<Authorized>
			<>
				<ShowActListLogoutNav />
				<ActivityEditForm />
			</>
		</Authorized>
			
		} />

		<Route path="/schedule/edit-schedule/:scheduleId" element={
			<Authorized>
			<>
				<ShowSchedListLogoutNav />
				<ScheduleEditForm />
			</>
		</Authorized>
			
		} />

		<Route path="/gallery" element={
			<Authorized>
			<>
				<ShowDashLogoutNav />
				<GalleryList />
			</>
		</Authorized>
			
		} />

		<Route path="/gallery/edit-upload/:uploadId" element={
			<Authorized>
			<>
				<ShowGalleryLogoutNav />
				<UploadEditForm />
			</>
		</Authorized>
			
		} />

		<Route path="/gallery/add-upload" element={
			<Authorized>
			<>
				<ShowGalleryLogoutNav />
				<AddUploadForm />
			</>
		</Authorized>
			
		} />

	</Routes>
}

// ShowDashLogoutNav