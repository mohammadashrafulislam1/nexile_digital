import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage/LandingPage";
import Error from "../pages/Error/Error";
import ContactUs from "../pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<Error />
    },
    {
        path:'/contact_us',
        element:<ContactUs/>,
        errorElement:<Error />
    },
    

])