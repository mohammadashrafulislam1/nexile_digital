import { Link } from "react-router-dom";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import { ServiceCard } from "../../Components/ForAll/ServiceCard";

const WhatWeDo = () =>{
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
  
            <div className="mb-96 relative lg:mt-[-200px] md:mt-[-450px] mt-[-450px]
            rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 !z-[40]">
                <div className="bg-[#131313] rounded-lg px-4 lg:py-[80px] lg:px-[80px] py-6">
                {
                    services?.map(service => (
                        <ServiceCard service={service}/>
                    ))
                }
                </div>
            </div>
  
            <Footer className="!z-24" />
          </div>
        </div>
      </div>
    )
}
export default WhatWeDo;