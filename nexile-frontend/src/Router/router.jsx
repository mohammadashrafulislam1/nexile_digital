import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage/LandingPage";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<Error />,
        children:[
            {
                path:'/',
                element:<LandingPage/>,
            },
            
        ]
    } 

])