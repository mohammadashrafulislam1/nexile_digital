import { Helmet } from "react-helmet";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";

const ContactUs = () =>{
    return(
        <div>
        {/* Helmet */}
        <Helmet>
        <title>Nexile Digital - Contact Us</title>
        <meta name="description" content="Contact with Nexile Digital to get your digital solutions. Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
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

export default ContactUs;