import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"
import "./Rainbow.css"
import { Home } from "./home/Home"
import { HomeNav } from "./nav/HomeNav"
import { ActivityEditForm } from "./Activities/ActivityEdit"
import { ActivityEditNav } from "./nav/ActivityEditNav"
import { LoginNav } from "./nav/LoginNav"
import { DashNav } from "./nav/DashNav"


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
				<> </>
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
	</Routes>
}

