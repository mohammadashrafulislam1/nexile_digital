import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage/LandingPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<div>ERROR</div>,
        children:[
            {
                path:'/',
                element:<LandingPage/>,
            },
            
        ]
    } 

])