import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Hero from "../Pages/Hero";
import Services from "../Pages/Services";
import About from "../Pages/About";
import HowWeWork from "../Pages/HowWeWork";
import Founder from "../Pages/Founder";
import Team from "../Pages/Team";
import Work from "../Pages/Work";
import ManageWorks from "../Pages/ManageWorks";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Dashboard/>,
        errorElement:<h1>Error</h1>,
        children:[
            {
                path:'/',
                element:<h2>Text</h2>
            },
            {
                path:'hero',
                element:<Hero/>
            },
            {
                path:'services',
                element:<Services/>
            },
            {
                path:'about',
                element:<About/>
            },
            {
                path:'howwework',
                element:<HowWeWork/>
            },
            {
                path:'founder',
                element:<Founder/>
            },
            {
                path:'team',
                element:<Team/>
            },
            {
                path:'work',
                element:<Work/>
            },
            {
                path:'manageworks',
                element:<ManageWorks/>
            },
        ],
    }
 ])