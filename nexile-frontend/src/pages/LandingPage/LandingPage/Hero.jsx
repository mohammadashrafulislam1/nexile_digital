import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

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
            <div className="flex justify-center mt-10"><button className="bg-white py-2 px-7 rounded-sm poppins-medium text-[25px]">Let’s Get Solution!</button></div>
           

           <div>
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
           </div>
           
            </div>
            
        )
   }
    </div>
    )
}
export default Hero;