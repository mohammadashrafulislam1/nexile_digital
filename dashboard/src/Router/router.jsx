import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Hero from "../Pages/Hero";

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
        ],
    }
 ])