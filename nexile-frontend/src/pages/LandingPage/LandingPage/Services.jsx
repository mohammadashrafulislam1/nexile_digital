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
          <div className="md:col-span-4 h-[46px] bg-gray-300 rounded-md"></div>
  
          {/* Subtitle Skeleton */}
          <div className="md:col-span-4 h-[20px] bg-gray-300 rounded-md"></div>
  
          {/* Main Service Image Skeleton */}
          <div className="relative md:col-span-3">
            <div className="w-[260px] h-[160px] bg-gray-300 rounded-xl"></div>
          </div>
  
          {/* Right Arrow Skeleton */}
          <div className="md:col-span-1 w-16 h-16 bg-gray-300 rounded-full"></div>
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
    <div className="px-8 lg:py-5 relative overflow-x-hidden">
        {loading ? (
            <SkeletonLoader />
        ) : (<div>
            
            <div className="lg:flex justify-end items-center">
              <h2 className="text-white lg:py-20 pb-6 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
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
                    className="lg:w-[125px] w-[80px] ml-19"
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
              className="absolute lg:right-[-500px] top-8"/>
            </div>
            <div className="pb-10">
              {loading ? (
                <SkeletonLoader />
              ) : (
                services?.map((service) => (
                  <div
                    key={service._id}
                    className="group grid md:grid-cols-12 h-10 hover:h-[550px] md:hover:h-[151px] md:gap-3 gap-0 md:h-[151px] h-[100px] my-auto justify-between items-center border-b-2 relative"
                  >
                    {/* Service Title */}
                    <h3 className="text-[#A8A8A8] lg:text-[46px] text-[20px] md:text-[30px] poppins-semibold md:col-span-4 group-hover:text-white relative md:mb-0 mb-[-70px]">
                      {service.title}
                      {/* Square Dot */}
                      <span className="hidden group-hover:inline-block bg-[#00ECFB] w-2 h-2 ml-2 rounded-sm absolute bottom-2"></span>
                    </h3>
      
                    {/* Subtitle */}
                    <p className="mb-2 md:mt-0 mt-[-100px] text-transparent group-hover:block lg:text-[20px] md:text-[16px] text-[16px] poppins-light md:col-span-4 md:px-3 group-hover:text-white transition duration-300">
                      {service?.subtitle}
                    </p>
      
                    {/* Main Service Image */}
                    <div className="relative md:col-span-3 mt-[-100px] md:mt-4 overflow-visible  md:block hidden">
                      <img
                        src={service?.mainServiceImage}
                        alt={`${service.title}, nexile digital`}
                        className="hidden group-hover:block md:w-[300px] lg:h-[250px] md:h-[180px] w-[240px] h-[160px] object-cover 
                          rounded-xl md:absolute md:group-hover:translate-y-[-10px] transition duration-300 z-10 lg:top-[-120px] md:top-[-80px] top-[-280px]"
                      />
                    </div>
      
                    {/* Right Arrow */}
                    <div
                      className="text-white border border-2px lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
                      group-hover:bg-white group-hover:text-black transition duration-300  md:block hidden "
                    >
                      <BsArrowRight />
                    </div>
                    <div className="flex items-center justify-between md:hidden block">
                    <div className="relative md:col-span-3 mt-[-140px] md:mt-4 overflow-visible">
                      <img
                        src={service?.mainServiceImage}
                        alt={`${service.title}, nexile digital`}
                        className="hidden group-hover:block md:w-[300px] lg:h-[250px] md:h-[180px] w-[240px] h-[160px] object-cover 
                          rounded-xl md:absolute md:group-hover:translate-y-[-10px] transition duration-300 z-10 lg:top-[-120px] md:top-[-80px] top-[-280px]"
                      />
                    </div>
      
                    {/* Right Arrow */}
                    <div
                      className="text-white border border-2px lg:text-[40px] mt-[-80px] md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-2 md:px-2 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center 
                      group-hover:bg-white group-hover:text-black transition duration-300 group-hover:mt-[-100px]"
                    >
                      <BsArrowRight />
                    </div>
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
