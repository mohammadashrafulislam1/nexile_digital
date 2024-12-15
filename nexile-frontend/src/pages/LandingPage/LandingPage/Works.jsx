import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../../Components/ForAll/ForAll";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";

const Works = () => {
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${endPoint}/TechCategory`);
        setCategories(response.data.techCategories);
      } catch (error) {
        console.error("Error fetching Categoriess:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

    const fetchWorksWithCategory = async () => {
      try {
        const worksResponse = await axios.get(`${endPoint}/works`);
        const worksWithCategories = worksResponse.data.works.map(work => {
          const category = categories.find(cat => cat._id === work.category);
          return { ...work, categoryName: category?.name || "No category specified" };
        });
        setWorks(worksWithCategories);
      } catch (error) {
        console.error("Error fetching Works:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (categories.length > 0) {
      fetchWorksWithCategory();
    }

    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  },[categories])


  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }
  
  return (
    <div className="px-8 lg:py-5 relative overflow-hidden">
            <div className="lg:flex justify-end flex-row-reverse items-center mt-14 md:mt-0">
      <h2 className="text-white lg:py-6 pb-6 text-right lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
      projects by
        nexile digital
      </h2>
      <div className="lg:w-[56%]">
        <p className="font-[100] text-white text-[20px]">There are some projects that we have done. All of these projects have been featured by us click the arrow button to see all projects done by Nexile Digital</p>
        <Link to="/" className=" flex justify-end">
          <img
            src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
            className="lg:w-[125px] w-[80px]"
            alt=""
          />
        </Link>
      </div>
    </div>

    <div className="grid md:grid-cols-3 grid-cols-1 py-20 items-center">
      <div className="md:col-span-1 md:mb-0 mb-40 relative">
      {
        categories?.map(category => 
          <div className="group flex pointer justify-between items-center border-b-[3px] border-[#333] py-6 z-10">
            <h3 className="text-[#A8A8A8] lg:text-[43px] text-[20px] md:text-[30px] poppins-semibold md:col-span-4 group-hover:text-white relative md:mb-0">
          {category.name}
          {/* Square Dot */}
          <span className="hidden group-hover:inline-block bg-[#00ECFB] w-2 h-2 ml-2 mb-1 rounded-sm absolute bottom-2"></span>
        </h3>
        <FaChevronRight className="text-[#A8A8A8] group-hover:text-white font-bold text-2xl"/>
          </div>
        )
      }
      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734280441/nexile%20digital/asset/nrgvfbmnz8aqd1byy2ck.webp" 
      alt="" className="absolute top-0 ml-[-40px] w-full h-full z-0"/>
      </div>

      <div className="md:col-span-2 md:px-8 relative">
{/* Navigation Arrows */}
<div>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {works.map((work) => (
          <SwiperSlide key={work._id} className="p-4 rounded-lg shadow-md">
            <div className="md:flex items-center">
            <div className="relative md:w-[1080px] w-full md:h-[440px] overflow-visible">
  <img
    src={work.images?.[0]?.url || "https://via.placeholder.com/150"}
    alt={work.title}
    className=" md:w-[1080px] w-full md:h-[400px] object-cover rounded-[10px] mt-10"
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[10px] opacity-80 transition-opacity duration-300 flex items-center justify-center">
  </div>
  
  <img
  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734276289/nexile%20digital/asset/fslpkycofr0yd2w0xjv5.webp"
  alt=""
  className="absolute lg:top-[-23px] top-[-32px] right-[-30px] z-20 "
/>

</div>

              <div className="md:ml-[-107px] z-20">
                <h3 className="mt-4 text-white poppins-semibold md:text-[49px] text-[29px]">{work.title}</h3>
              <p className=" text-[20px] text-[#00ECFB]">
                {work.categoryName || "No category specified"}
              </p>
             <Link to='/'> <div className="md:text-[30px] text-[#fff] flex items-center gap-3 border-b-[2px] w-fit">View This project 
             <LuMoveRight className="md:text-5xl font-[400]"/></div></Link></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734277609/nexile%20digital/asset/pj1hz0xmvb0lxvx74qw2.webp" 
      alt="" 
      className="absolute top-0 right-0"/>
      </div>
    </div>
        

      
    </div>
  );
};

export default Works;
