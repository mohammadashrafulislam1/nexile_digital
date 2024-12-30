import { Link } from "react-router-dom";
import Footer from "../../Components/ForAll/Footer";
import { Helmet } from "react-helmet";
import Header from "../../Components/ForAll/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";

const Faqs = () =>{
    const [faqs, setFaqs] = useState(null); // Initialize as null to handle data absence gracefully

    useEffect(() => {
      const fetchFAQs = async () => {
        try {
          const response = await axios.get(`${endPoint}/faq`);
          setFaqs(response.data[0]); // Assuming response.data is an array
        } catch (error) {
          console.error("Error fetching FAQs:", error);
        }
      };
  
      fetchFAQs();
    }, []);
  
    if (!faqs) {
      // Render a loading state or fallback UI until data is fetched
      return <div className="text-white text-center">Loading FAQs...</div>;
    }
    console.log(faqs)
    return(
        <div>
        {/* Helmet */}
        <Helmet>
        <title>Nexile Digital - FAQs</title>
        <meta name="description" content="Frequently asked questions about Nexile Digital to know more about our digital solutions. Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
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
     <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" 
             style={{letterSpacing:'-5px'}}>{faqs?.sectionTitle}</h2>
      <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center"> {faqs?.sectionDescription}</p>
      <Link to={"/contact_us"} className="flex justify-center my-4">
        <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">
            Let’s Get Solution!</button></Link>
            

     </div>


    
    
      {/* Black shadow at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>

    

   <div className="lg:w-[60%] mb-12 w-[90%] mx-auto rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 mx-3 my-4 md:p-1 lg:mt-[-600px] md:mt-[-800px] mt-[-600px] z-20 relative">
   <div className="bg-[#131313] rounded-lg md:p-10 p-3">
          {faqs.faqs?.map((faq, index) => (
            <div
              key={index}
              className={`text-[20px] pb-6 border-b-[3px] border-[#646464] p-3`}
            >
              <h3 className="text-white poppins-semibold text-[18px]">- {faq.title}</h3>
              <p className="text-white poppins-light text-[15px]">{faq.description}</p>
            </div>
          ))}
        </div>
   </div>
    

       
      <Footer className="!z-24"/>
      </div>
    </div>
        </div>
    )
}

export default Faqs;