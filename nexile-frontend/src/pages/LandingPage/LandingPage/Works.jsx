import { useEffect, useState, useRef } from "react";
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

const Works = () => {
  const [works, setWorks] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

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

    const fetchWorks = async () => {
      try {
        const response = await axios.get(`${endPoint}/works`);
        setWorks(response.data.works);
      } catch (error) {
        console.error("Error fetching Workss:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();

    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  },[])

  useEffect(() => {
    if (prevRef.current && nextRef.current && !initialized) {
      setInitialized(true);
    }
  }, [prevRef, nextRef, initialized]);

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

    <div className="grid grid-cols-3 py-20">
      <div className="col-span-1">
      {
        categories?.map(category => 
          <div className="group flex justify-between items-center border-b-[3px] border-[#333] py-6">
            <h3 className="text-[#A8A8A8] lg:text-[43px] text-[20px] md:text-[30px] poppins-semibold md:col-span-4 group-hover:text-white relative md:mb-0 mb-[-70px]">
          {category.name}
          {/* Square Dot */}
          <span className="hidden group-hover:inline-block bg-[#00ECFB] w-2 h-2 ml-2 mb-1 rounded-sm absolute bottom-2"></span>
        </h3>
        <FaChevronRight className="text-[#A8A8A8] group-hover:text-white font-bold text-2xl"/>
          </div>
        )
      }
      </div>

      <div className="col-span-2">
{/* Navigation Arrows */}
<div>
      <div
        ref={prevRef}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full cursor-pointer"
      >
        <FaAngleLeft size={20} />
      </div>
      <div
        ref={nextRef}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full cursor-pointer"
      >
        <FaAngleRight size={20} />
      </div>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={initialized ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          if (initialized) {
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {works.map((work) => (
          <SwiperSlide key={work._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div>
              <img
                src={work.images?.[0]?.url || "https://via.placeholder.com/150"}
                alt={work.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{work.title}</h3>
              <p className="text-sm text-gray-500">
                {work.category || "No category specified"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
    </div>
        

      
    </div>
  );
};

export default Works;
