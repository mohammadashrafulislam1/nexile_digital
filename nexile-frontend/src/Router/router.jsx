import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage/LandingPage";
import Error from "../pages/Error/Error";
import ContactUs from "../pages/ContactUs/ContactUs";
import Blogs from "../pages/Blogs/Blogs";
import AboutUs from "../pages/AboutUs/AboutUs";
import WhatWeDo from "../pages/WhatWeDo/WhatWeDo";
import Faqs from "../pages/Faqs/Faqs";

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
    {
        path:'/blogs',
        element:<Blogs/>,
        errorElement:<Error />
    },
    {
        path:'/about_us',
        element:<AboutUs/>,
        errorElement:<Error />
    },
    {
        path:'/what_we_do',
        element:<WhatWeDo/>,
        errorElement:<Error />
    },
    {
        path:'/faqs',
        element:<Faqs/>,
        errorElement:<Error />
    },
    


])