import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endPoint } from "./ForAll";

const Footer = () =>{
    const [services, setServices] = useState([]);
    const [footer, setFooter] = useState([]);
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

      const fetchFooter = async () => {
        try {
          const response = await axios.get(`${endPoint}/footer`);
          setFooter(response.data.footer[0]);
        } catch (error) {
          console.error("Error fetching Footer:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFooter();
      // Set a timeout for loader to hide after 2 seconds if data fetch is complete
      const timer = setTimeout(() => setLoading(false), 2000);
  
      return () => clearTimeout(timer); // Clear the timer on component unmount
    }, []);
    console.log(footer)
    return(
    <div className=" z-10">
         <div className="flex flex-wrap lg:justify-around justify-start lg:gap-0 gap-24">

<div className="px-8 lg:py-5 z-10">
    <h6 className="text-white poppins-black text-[16px]">Company</h6>
    {footer?.company?.map((company) => (
    <Link to={company?.link}><p className="text-white poppins-medium text-[16px] opacity-60 mt-4 w-fit">{company?.name}</p></Link>
    ))}
</div>

<div className="px-8 lg:py-5 z-10">
    <h6 className="text-white poppins-black text-[16px]">Services</h6>
    {footer?.services?.map((service) => (            
        <Link to={service.link} key={service._id}><p className="text-white poppins-medium text-[16px] opacity-60 mt-4 w-fit">{service.name}</p></Link>
))}
</div>

<div className="px-8 lg:py-5 z-10">
    <h6 className="text-white poppins-black text-[16px]">Resources</h6>
    {footer?.resources?.map((Resource) => (            
        <Link to={Resource.link} key={Resource._id}><p className="text-white poppins-medium text-[16px] opacity-60 mt-4 w-fit">{Resource.name}</p></Link>
))}
</div>

<div className="px-8 lg:py-5 z-10">
    <h6 className="text-white poppins-black text-[16px]">Follow us</h6>
    {footer?.followUs?.map((follow) => (            
        <Link to={follow.url} key={follow._id}><p className="text-white poppins-medium text-[16px] opacity-60 mt-4 w-fit">{follow.platform}</p></Link>
))}
</div>

<div className="px-8 lg:py-5 z-10">
    <img src={footer?.logo} alt="" className="w-[160px] h-[33px]" />
    <p className="text-white poppins-bold opacity-60 mt-8">{footer?.contactMessage}</p>
    <button className="bg-white lg:py-2 lg:px-5 mt-6 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">Let’s Work Together!</button>

</div>
</div>


<p className="text-white text-center py-8 opacity-40 text-[16px]">{footer?.copyright?.message} {footer?.copyright?.company}</p>
    </div>
    )
}
export default Footer;