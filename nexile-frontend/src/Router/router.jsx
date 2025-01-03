import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage/LandingPage";
import Error from "../pages/Error/Error";
import ContactUs from "../pages/ContactUs/ContactUs";
import Blogs from "../pages/Blogs/Blogs";
import AboutUs from "../pages/AboutUs/AboutUs";
import WhatWeDo from "../pages/WhatWeDo/WhatWeDo";
import Faqs from "../pages/Faqs/Faqs";
import Projects from "../pages/Projects/Projects";
import SingleProject from "../pages/SinglePage/SingleProject";
import { endPoint } from "../Components/ForAll/ForAll";
import SingleBlog from "../pages/SinglePage/SingleBlog";

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
    {
        path:'/projects',
        element:<Projects/>,
        errorElement:<Error />
    },
    {
        path:'/project/:title',
        element:<SingleProject/>,
        errorElement:<Error />,
    },
    {
        path:'/blog/:title',
        element:<SingleBlog/>,
        errorElement:<Error />,
    },
    


])