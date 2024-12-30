import { Link } from "react-router-dom";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import { ServiceCard } from "../../Components/ForAll/ServiceCard";
import HowWeWork from "../LandingPage/LandingPage/HowWeWork";
import { FaArrowRight } from "react-icons/fa";

const WhatWeDo = () =>{
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [faqs, setFaqs] = useState(null); // Initialize as null to handle data absence gracefully

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
    
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${endPoint}/faq`);
        setFaqs(response.data[0]); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);
  console.log(services)
    return(
        <div>
        {/* Helmet */}
        <Helmet>
          <title>Nexile Digital - Services</title>
          <meta name="description" content="What Nexile Digital do or our services. Nexile Digital is an all-in-one digital solution provider." />
        </Helmet>
  
        {/* Content */}
        <div className="bg-black overflow-hidden">
          <div className="relative z-0 bg-black">
            <div
              style={{
                backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: 0,
              }}
              className="relative"
            >
              {/* Background images */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/ebqjrqhwdf0puwpmup9g.webp"
                  alt=""
                  className="absolute right-0 z-[-1]"
                />
                <img
                  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040744/nexile%20digital/asset/krjhtmdwyfeoebirihzq.webp"
                  alt=""
                  className="absolute left-0 z-[-1]"
                />
              </div>
  
              {/* Content */}
              <Header className="relative z-10" />
  
              <div className="h-[700px]">
                <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40"
                    style={{ letterSpacing: '-5px' }}>
                  Services from Nexile Digital
                </h2>
                <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center">
                  What Nexile Digital Do?
                </p>
                <Link to={"/contact_us"} className="flex justify-center my-4">
          <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">
              Contact Us!</button></Link>
             
              </div>
  
              {/* Black shadow at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>
  
            <div className="mb-8 relative lg:mt-[-200px] md:mt-[-450px] mt-[-400px]
            rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 lg:mx-12 mx-3 my-4 !z-[40]">
                <div className="bg-[#131313] rounded-lg px-4 lg:py-[80px] lg:px-[80px] md:py-12 py-6">
                {
                    services?.map(service => (
                        <ServiceCard service={service}/>
                    ))
                }
                </div>
            </div>

  <HowWeWork/>
        <div className="w-full lg:mt-0 mt-6 mb-24 mx-auto">
        <h2 className="text-white lg:mb-24 mb-8 text-center lg:pt-20 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
        {faqs?.sectionTitle}
      </h2>
      <div className="lg:w-[60%] w-full relative px-4 lg:px-0 mx-auto">
          {faqs?.faqs?.slice(0, 4).map((faq, index) => (
            <div
              key={index}
              className={`text-[20px] pb-6 ${
                index !== faqs.faqs.slice(0, 4).length - 1
                  ? "border-b-[3px] border-[#646464]"
                  : ""
              } ${index > 0 ? "pt-6" : ""}`}
            >
              <h3 className="text-white poppins-semibold">{faq.title}</h3>
              <p className="text-white poppins-light">{faq.description}</p>
            </div>
          ))}<img 
          className="absolute top-0"
          src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734902203/nexile%20digital/asset/x6mschkkfnxwl6njcsnj.webp" alt="" />
          

          <Link to="/faqs" className="mt-12 text-white border-[1px] border-[#fff] flex items-center gap-2 justify-center">
            <p>View All</p> <FaArrowRight/>
          </Link>
          </div>
        </div>
  
  
            <Footer className="!z-24" />
          </div>
        </div>
      </div>
    )
}
export default WhatWeDo;