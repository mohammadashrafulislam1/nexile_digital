import { useEffect, useState } from "react";
import { LuMoveRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Testimonials = () =>{
  const [testimonials, setTestimonials] = useState([]);

  useEffect(()=>{

    const fetchTestimonials= async () => {
      try {
        const worksResponse = await axios.get(`${endPoint}/clientTestimonial`);
        setWorks(worksResponse.data);
        console.log(worksResponse)
      } catch (error) {
        console.error("Error fetching Works:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (testimonials.length > 0) {
      fetchTestimonials();
    }

    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  },[])
    return(
    <div className="lg:py-5 relative overflow-x-hidden">
   <div className="px-8 lg:flex justify-end items-center">
              <h2 className="text-white lg:w-[90%] lg:pt-20 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
              What our clients saying
              </h2>
              <div className="lg:w-[30%]">
                <p className="font-[100]  text-white text-[20px] lg:ml-[-200px]">
                We have collaborate with or work with them and helped them to grow their business. With the help of Nexile Digital you also can grow/boost your business. 
                </p>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
                    className="lg:w-[125px] w-[80px] ml-19 flex"
                    alt=""
                  />
                </Link>
              </div>
            </div>
        
        <div className=" h-[800px] w-[1442px]"
    style={{
      backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734718037/nexile%20digital/asset/ow0kdpfdx5ebqmhyebxa.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative', // Ensure background is a layer
      zIndex: 0, // Send background layer to the back
    }}>
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
        {testimonials.map((work) => (
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

        </div>
    </div>
    )
}

export default Testimonials;