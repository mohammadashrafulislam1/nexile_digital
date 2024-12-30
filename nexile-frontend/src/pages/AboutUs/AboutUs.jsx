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
        <div className="mt-4">
         <p className="text-[15px] md:text-[18px] md:px-24 p-3 rounded-lg text-white">{about?.sectionDes}</p>
        </div>

     </div>


    
    
      {/* Black shadow at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>
    

    <div
  className="md:p-3 lg:p-0 p-2  mx-auto my-auto flex items-center justify-center mb-24 lg:mt-[-480px] md:mt-[-680px] mt-[-500px] z-24 relative">
     <div
  className=" w-full mx-auto my-auto md:p-[40px] flex flex-col justify-center lg:pt-0 md:p-9 p-3"
  >

   <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 p-4">
        <h4 className="text-[15px] md:text-[18px] md:p-5 p-3 rounded-lg text-[#131313] poppins-semibold">Who we are</h4>
         <p className="text-[15px] md:text-[18px] md:p-5 p-3 rounded-lg text-[#131313]">{about?.sectionDes}</p>
        </div>

        

    <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 p-3">
        <h4 className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white poppins-semibold">Our story</h4>
         <div className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white lg:flex items-center gap-4">
            <img src={about?.ourStory?.image?.url} alt={about?.ourStory?.description} className="rounded-lg lg:w-72 w-24 h-24 lg:h-72 mb-5 lg:mb-0"/>
            {about?.ourStory?.description}
            </div>
        </div>


        <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 p-4">
        <h4 className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white poppins-semibold">Our mission</h4>
         <div className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white lg:flex items-center gap-4">
            <img src={about?.ourMission?.image?.url} alt={about?.ourMission?.description} className="rounded-lg lg:w-72 w-24 h-24 lg:h-72 mb-5 lg:mb-0"/>
            {about?.ourMission?.description}
            </div>
        </div>

        <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 md:mx-12 mx-3 my-4 p-4">
        <h4 className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white poppins-semibold">Our vision</h4>
         <div className="text-[15px] md:text-[18px] md:p-5 p-3 bg-[#131313] rounded-lg text-white lg:flex items-center gap-4">
            <img src={about?.ourVision?.image?.url} alt={about?.ourVision?.description} className="rounded-lg lg:w-72 w-24 h-24 lg:h-72 mb-5 lg:mb-0"/>
            {about?.ourVision?.description}
            </div>
        </div>

        <div className="md:px-12 lg:px-12 px-0">
        <h2 style={{
                background: "linear-gradient(30deg, #FA7C0B, #9F8CED, #9DE8EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }} className="poppins-extrabold text-center mt-5 pb-0 mb-0 lg:text-[90px] text-[40px]">
                Why Choose Us
        </h2>

        {
            about?.whyChooseUs?.map((why, index) => <div key={why?._id}>
                <h3 className="poppins-extrabold flex items-center text-white mt-5 pb-0 mb-0 md:text-[20px] py-2 text-[16px]">
                    <span className="px-4 py-2 border-[1px] border[#fff] rounded-full mr-3">{index+1}</span> 
                    {why?.title}
                    </h3>
                <p className="text-white mt-2">{why?.description}</p>
            </div>)
        }

<h2 style={{
                background: "linear-gradient(30deg, #FA7C0B, #9F8CED, #9DE8EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }} className="poppins-extrabold text-center mt-10 pb-0 mb-0 lg:text-[90px] text-[40px]">
                Core values
        </h2>

        {
            about?.coreValues?.map((value, index) => <div key={value?._id}>
                <h3 className="poppins-extrabold flex justify-end items-center text-end text-white mt-5 pb-0 mb-0 md:text-[20px] py-2 text-[16px]">
                    {value?.title}
                    <span className="px-4 py-2 border-[1px] border[#fff] rounded-full ml-3">{index+1}</span> 
                    </h3>
                <p className="text-white mt-2 text-end">{value?.description}</p>
            </div>)
        }

<h2 style={{
                background: "linear-gradient(30deg, #FA7C0B, #9F8CED, #9DE8EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }} className="poppins-extrabold text-center mt-10 pb-0 mb-0 lg:text-[90px] text-[40px]">
                Our Impact
        </h2>

        {
            about?.ourImpact?.map((impact, index) => <div key={impact?._id}>
                <h3 className="poppins-extrabold items-center flex text-white mt-5 pb-0 mb-0 md:text-[20px] py-2 text-[16px]">
                <span className="px-4 py-2 border-[1px] border[#fff] rounded-full mr-3">{index+1}</span> 
                    {impact?.title}
                    </h3>
                <p className="text-white mt-2">{impact?.description}</p>
            </div>)
        }
        </div>

        
    </div>
    </div>
    
     

       
      <Footer className="!z-24"/>
      </div>
    </div>
        </div>
    )
}
export default AboutUs;