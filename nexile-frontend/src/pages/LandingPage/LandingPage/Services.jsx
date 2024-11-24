import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endPoint } from "../../../Components/ForAll/ForAll";
import { BsArrowRight } from "react-icons/bs";
  
  

// Service Component
const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  

const SkeletonLoader = () => (
    <div className="animate-pulse py-24">
      {/* Section Title and Description Skeleton */}
      <div className="flex justify-end items-center mb-10 gap-2">
        {/* Title Skeleton */}
        <div className="w-[50%]">
          <div className="h-[300px] bg-gray-300 rounded-md mb-5"></div>
        </div>
        {/* Description Skeleton */}
        <div className="w-[60%]">
          <div className="h-[150px] bg-gray-300 rounded-md mb-5"></div>
          {/* Placeholder for Image Link */}
          <div className="w-[155px] h-[155px] bg-gray-300 ml-10 rounded-md"></div>
        </div>
      </div>
  
      {/* Service Items Skeleton */}
      {[...Array(services? services.length : 3)].map((_, index) => (
        <div
          key={index}
          className="group grid grid-cols-12 gap-3 h-[151px] justify-center items-center border-b-2 relative mb-5"
        >
          {/* Service Title Skeleton */}
          <div className="col-span-4 h-[46px] bg-gray-300 rounded-md"></div>
  
          {/* Subtitle Skeleton */}
          <div className="col-span-4 h-[20px] bg-gray-300 rounded-md"></div>
  
          {/* Main Service Image Skeleton */}
          <div className="relative col-span-3">
            <div className="w-[260px] h-[160px] bg-gray-300 rounded-xl"></div>
          </div>
  
          {/* Right Arrow Skeleton */}
          <div className="col-span-1 w-16 h-16 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${endPoint}/service`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <div className="px-8 py-5 relative">
        {loading ? (
            <SkeletonLoader />
        ) : (<div>
            
            <div className="flex justify-end items-center">
              <h2 className="text-white py-20 text-[130px] uppercase font-bold underline leading-[140px]">
                services
                <br />
                NEXILE PROVIDES
              </h2>
              <div>
                <p className="font-[100] text-white text-[20px]">
                  At Nexile Digital, we provide a wide range of digital solutions
                  designed to enhance your online presence, streamline your business
                  processes, and help you achieve your goals. Whether you're looking
                  to create a stunning website, boost your search engine rankings, or
                  develop custom software, our expert team is here to help. Explore
                  our services below to see how we can support your business.
                </p>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
                    className="w-[155px] ml-10"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div>
              <img 
              src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732475684/nexile%20digital/asset/o4rlreyzvegw0z8ehkze.webp" 
              alt="Nexile Digital - asset" 
              className="absolute left-[-100px] top-8"/>
              <img 
              src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732475683/nexile%20digital/asset/vqtxdooh458acymmbavx.webp" 
              alt="Nexile Digital - asset" 
              className="absolute right-[-500px] top-8"/>
            </div>
            <div className="pb-10">
              {loading ? (
                <SkeletonLoader />
              ) : (
                services?.map((service) => (
                  <div
                    key={service._id}
                    className="group grid grid-cols-12 gap-3 h-[151px] justify-center items-center border-b-2 relative"
                  >
                    {/* Service Title */}
                    <h3 className="text-[#A8A8A8] text-[46px] poppins-semibold col-span-4 group-hover:text-white relative">
                      {service.title}
                      {/* Square Dot */}
                      <span className="hidden group-hover:inline-block bg-[#00ECFB] w-2 h-2 ml-2 rounded-sm absolute bottom-2"></span>
                    </h3>
      
                    {/* Subtitle */}
                    <p className="text-transparent text-[20px] poppins-light col-span-4 px-3 group-hover:text-white transition duration-300">
                      {service?.subtitle}
                    </p>
      
                    {/* Main Service Image */}
                    <div className="relative col-span-3 overflow-visible">
                      <img
                        src={service?.mainServiceImage}
                        alt={`${service.title}, nexile digital`}
                        className="hidden group-hover:block w-[300px] h-[250px] object-cover 
                          rounded-xl absolute group-hover:translate-y-[-10px] transition duration-300 z-10 top-[-120px]"
                      />
                    </div>
      
                    {/* Right Arrow */}
                    <div
                      className="text-white border border-2px text-[40px] font-[400] py-3 px-2 rounded-full w-16 h-16 flex justify-center items-center col-span-1 
                      group-hover:bg-white group-hover:text-black transition duration-300"
                    >
                      <BsArrowRight />
                    </div>
                  </div>
                ))
              )}
            </div></div>)
   }
    </div>
  );
};

export default Service;
