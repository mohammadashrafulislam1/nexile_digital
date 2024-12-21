import { useEffect, useState } from "react";
import { LuMoveRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import axios from "axios";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [expandedTestimonials, setExpandedTestimonials] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleReadMore = (id) => {
    setExpandedTestimonials((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${endPoint}/clientTestimonial`);
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? "text-[#00ECFB] text-[20px]" : "text-[#fff] text-[20px]"} ${
          index < rating ? "fas fa-star" : "far fa-star"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="lg:py-5 relative overflow-x-hidden">
      <div className="px-8 lg:flex justify-end items-center">
        <h2 className="text-white lg:w-[90%] lg:pt-20 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
          What our clients are saying
        </h2>
        <div className="lg:w-[30%]">
          <p className="font-[100] text-white text-[20px] md:mt-0 mt-4 lg:ml-[-200px]">
            We have collaborated with or worked with them and helped them grow
            their business. With the help of Nexile Digital, you can also
            grow/boost your business.
          </p>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
              className="lg:w-[125px] w-[80px] ml-19 flex"
              alt="Logo"
            />
          </Link>
        </div>
      </div>

      <div
        className="h-[800px] w-full lg:grid lg:grid-cols-3 md:grid-cols-2 gap-10 justify-center items-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734718037/nexile%20digital/asset/ow0kdpfdx5ebqmhyebxa.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: 0,
        }}
      >
        <div className="lg:col-span-1 col-span-1">
         <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734735974/nexile%20digital/asset/k3gel9qz6m3wb5gxtanm.webp" alt="" />
        </div>

        <div className="lg:col-span-2 col-span-1">
        <Swiper
      spaceBetween={4}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1.2 },
      }}
      modules={[Pagination]}
      className="mySwipe relative"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide
          key={testimonial._id}
          className={`p-4 rounded-lg shadow-md transition-opacity duration-500 ${
            activeIndex === index ? "opacity-100" : "opacity-40"
          }`}
        >
          <div className="flex flex-col items-start p-6 rounded-lg">
            <p className="mt-4 mb-10 z-20 text-white text-start md:text-[26px] text-[18px] poppins-regular">
              {expandedTestimonials[testimonial._id]
                ? testimonial.testimonialText
                : `${testimonial.testimonialText.slice(0, 164)}...`}
              <p
                className="text-[#00ECFB] cursor-pointer underline"
                onClick={() => toggleReadMore(testimonial._id)}
              >
                {expandedTestimonials[testimonial._id] ? "See Less" : "See More"}
              </p>
            </p>
            
            <div className="flex md:flex-row flex-col justify-center items-center gap-6">
            <div className="md:w-24 w-18 h-18 md:h-24 w-18 h-18 relative mb-3">
              <img
                src={testimonial.clientImage}
                alt={testimonial.clientName}
                className="md:w-24 w-18 h-18 md:h-24 w-18 h-18 rounded-full shadow-lg"
              />
              <div className="bg-[#699396] md:w-8 w-12 md:h-8 h-12 rounded-full absolute md:right-0 right-0 bottom-0">
                <img
                  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734735095/nexile%20digital/asset/pueqdqaepb88a688mlqz.webp"
                  alt=""
                />
              </div>
            </div>
            <div>
            <h3 className="md:mt-4 mt-1 md:text-[25px] text-[20px] md:text-start text-center poppins-semibold text-white">
              {testimonial.clientName}
            </h3>
            <p className="md:text-[20px] text-[16px] text-white md:text-start text-center poppins-extralight underline">
              {testimonial.clientDescription}
            </p>
            </div>
          </div>
            </div>
            
            <div className="flex items-center md:justify-start justify-center gap-3 ml-5">
            <div>
              <p className="text-[18px] text-white poppins-extralight">Reviews on</p>
              <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731042430/nexile%20digital/asset/zyg5fsrl4n7oyssnvf06.webp"
              className="w-[80px] h-[29px]" alt="" />
            </div>
            <div>
               <div className="mt-2 text-[#00ECFB]">{renderStars(testimonial.rating)}</div>
               <p className="text-[18px] text-white poppins-regular">Got {testimonial.rating} stars</p>
            </div>
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
