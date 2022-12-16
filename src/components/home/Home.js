import { Outlet, Route, Routes } from "react-router-dom"
import "./Home.css"

export const Home = () => {
    return <>
        <Routes>
            <Route path="*" element={
                <>
                    <h1 className="future-page">Future Landing Page of Over the Rainbow</h1>
                    <h2 className="backstory">Over the Rainbow is a co-parenitng site develped for families that deal with the intricacies of a split household on a daily basis.</h2>
                    <div className="work-in-progress"></div>

                    <Outlet />
                </>
            }>


            </Route>
        </Routes>
    </>
}