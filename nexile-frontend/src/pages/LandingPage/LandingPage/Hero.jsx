import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Hero =()=>{
    const [header, setHeader] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response = await axios.get(`${endPoint}/hero`);
                console.log(response.data);
                setHeader(response.data);
            } catch (error) {
                console.error("Error fetching header data:", error);
            } finally {
                setLoading(false); // Set to false after fetch attempt
            }
        };
        fetchHeader();
    }, []);
    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="animate-pulse flex gap-5 navbar justify-between">
            <div className="h-12 bg-gray-300 w-[300px] rounded"></div>
            <div className="flex gap-2 w-[40%] items-center justify-end lg:justify-center">
            <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
            <div className="h-6 bg-white lg:w-full rounded w-10"></div>
            </div>
        </div>
);

    console.log(header)
    return(
    <div className="bg-black">
         {loading ? (
            <SkeletonLoader />
        ) : ( 
            <div className="pt-[160px] pb-14">
             <h2 className="text-[130px] font-bold text-white text-center uppercase" style={{lineHeight:'130px', letterSpacing:'-5px'}}>{header[0]?.title}</h2>
            <p className="text-[30px] text-white font-[100] text-center">{header[0]?.description}</p>
            <button className="bg-white py-2 px-7 rounded-md poppins-medium text-[25px] flex justify-center items-center">Let’s Get Solution!</button>
            </div>
            
        )
   }
    </div>
    )
}
export default Hero;