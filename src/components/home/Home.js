import { Outlet, Route, Routes } from "react-router-dom"
import "./Home.css"

export const Home = () => {
    return <>
        <Routes>
            <Route path="*" element={
                <>
                    <h1 className="future-page">Unlock the power of living somewhere over the rainbow</h1>
                    <h2 className="backstory">Over the Rainbow is a co-parenting site developed in 2022 for families that deal with the intricacies of a split household on a daily basis.</h2>
                
                <h1 className="future-page">Let us help you:</h1>

                    <div className="work-in-progress"></div>

                <div className="home-grid">
                    <div className="home-thumbnail-1"></div>
                    <div className="home-thumbnail-2"></div>
                    <div className="home-thumbnail-3"></div>
                    <div className="home-thumbnail-4"></div>
                </div>

                    <Outlet />
                </>
            }>


            </Route>
        </Routes>
    </>
}