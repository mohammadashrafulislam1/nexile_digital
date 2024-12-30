import { RxEnvelopeClosed } from "react-icons/rx";
import Footer from "../../Components/ForAll/Footer";
import { GrMapLocation } from "react-icons/gr";
import Header from "../../Components/ForAll/Header";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";

const AboutUs = () =>{
    const [about, setAbout] = useState([]);

    useEffect(() => {
        const fetchAbout = async () => {
          try {
            const response = await axios.get(`${endPoint}/about`);
            setAbout(response.data);
          } catch (error) {
            console.error("Error fetching About data:", error);
          }
        };
        fetchAbout();
      }, []);
    console.log(about)
    return(
        <div>
        {/* Helmet */}
        <Helmet>
        <title>Nexile Digital - About Us</title>
        <meta name="description" content="Learn about Nexile Digital to get your digital solutions. Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
        </Helmet>
    
        {/* Content */}
       <div className="bg-black overflow-hidden">
       <div 
      className="relative z-0 bg-black" 
      >
      <div 
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', // Ensure background is a layer
        zIndex: 0, // Send background layer to the back
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

     

     <div className=" h-[1040px]">
     <h2 className="lg:text-[130px] text-[50px] md:px-4 px-1 mb-2 font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" 
             style={{letterSpacing:'-5px'}}>{about?.sectionTitle}</h2>
      <p className="lg:text-[30px] text-[18px] md:px-4 px-2 text-white font-[100] text-center">{about?.intro?.tagline}</p>
       {/* Section Description */}
        <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 p-4">
         <p className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white">{about?.sectionDes}</p>
        </div>

     </div>


    
    
      {/* Black shadow at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>
    
    
     

       
      <Footer className="!z-24"/>
      </div>
    </div>
        </div>
    )
}
export default AboutUs;