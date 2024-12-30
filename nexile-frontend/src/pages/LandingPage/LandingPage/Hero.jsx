import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import Rating from "react-rating";
import { FaHandshake, FaRegStar, FaStar } from "react-icons/fa";
import { PiBriefcase } from "react-icons/pi";
import { Link } from "react-router-dom";

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
            } 
        };
        fetchHeader();
        // Set a timeout for loader to hide after 2 seconds if data fetch is complete
        const timer = setTimeout(() => setLoading(false), 2000);

        return () => clearTimeout(timer); // Clear the timer on component unmount
    }, []);
    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="animate-pulse pt-[160px]">
            <div className="h-12 bg-gray-300 w-[60%] mx-auto h-[60px] pt-[160px] rounded"></div>
            <div className="h-12 bg-gray-300 w-[50%] mx-auto h-[60px] mt-[10px] rounded"></div>
            <div className="h-12 bg-gray-300 w-[30%] mx-auto h-[60px] mt-[10px] rounded"></div>
            <div className="flex gap-2 w-[90%] mx-auto mt-10 items-center justify-center">
            <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
            <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
            </div>
        </div>
);

    console.log(header)
    return(
    <div className="h-[750px]">
         {loading ? (
            <SkeletonLoader />
        ) : ( 
            <div className="lg:pt-[160px] pt-[30px] pb-14 z-100">
             <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" 
             style={{letterSpacing:'-5px'}}>{header[0]?.title}</h2>
            <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center">{header[0]?.description}</p>
            <div className="flex justify-center mt-10">
                <Link to={"/contact_us"}>
                <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">Let’s Get Solution!</button></Link>
            </div>
           

           <div className="flex flex-wrap md:justify-center justify-start lt:gap-12 gap-4 lg:mt-20 mt-10 px-20">
            {/* Google Review */}
            <div className="flex items-center gap-3">
                <div>
                    <h6 className="poppins-regular text-white text-[13px]">Reviews on</h6>
                    <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731042430/nexile%20digital/asset/vlfkczjzdigzssifail5.webp" 
                    alt="google logo, md ashraful islam, portfolio" className="w-[58px]" />
                </div>
                <div className="flex flex-col gap-0">
                <Rating
                    initialRating={header[0]?.googleReview}
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    readonly
                    className="text-[20px] text-[#00ECFB] mb-0"
                  />
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">Got {header[0]?.googleReview} stars</p>
                </div>
            </div>
            {/* Nexile Review */}
            <div className="flex items-center gap-3">
                <div>
                    <h6 className="poppins-regular text-white text-[13px]">Reviews on</h6>
                    <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731042430/nexile%20digital/asset/zyg5fsrl4n7oyssnvf06.webp" 
                    alt="nexile digital logo, md ashraful islam, portfolio" className="w-[58px]" />
                </div>
                <div className="flex flex-col gap-0">
                <Rating
                    initialRating={header[0]?.nexileReview}
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    readonly
                    className="text-[20px] text-[#00ECFB] mb-0"
                  />
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">Got {header[0]?.nexileReview} stars</p>
                </div>
            </div>

            {/* successful clients */}
            <div className="flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-[#00FF29] text-[30px] text-center flex justify-center items-center text-white rounded">
                <FaHandshake /> 
                </div>
                <div className="flex flex-col gap-0">
                <h6 className="poppins-regular text-white text-[18px]">successful clients</h6>
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">{header[0]?.clients}+</p>
                </div>
            </div>

             {/* experience */}
             <div className="flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-[#FF0000] text-[30px] text-center flex justify-center items-center text-white rounded">
                <PiBriefcase />
                </div>
                <div className="flex flex-col gap-0">
                <h6 className="poppins-regular text-white text-[18px]">experience</h6>
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">{header[0]?.experience}+</p>
                </div>
            </div>

           </div>
           
            </div>
            
        )
   }
    </div>
    )
}
export default Hero;