import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"

export const Home = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Over the Rainbow</h1>
                    <div>Keeping your co-parenting skies blue since 2022.</div>

                    <Outlet />
                </>
            }>

                <Route path="/login" element={ <Login /> } />

            </Route>
        </Routes>
    </>
}