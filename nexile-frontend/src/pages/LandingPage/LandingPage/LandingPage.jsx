import { Helmet } from "react-helmet";
import Header from "../../../Components/ForAll/Header";
import Hero from "./Hero";
import Service from "./Services";

const LandingPage = ()=>{
    return(
    <div>
    {/* Helmet */}
    <Helmet>
    <meta name="description" content="Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
    </Helmet>

    {/* Content */}
   <div className="bg-black">
   <div 
  className="bg-black relative" 
  >
  <div style={{
    backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
  }}
>
    {/* Background images */}
  <div className="z-0">
  <img 
    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040744/nexile%20digital/asset/krjhtmdwyfeoebirihzq.webp" 
    alt="" 
    className="absolute left-0"
  />
  <img 
    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/ebqjrqhwdf0puwpmup9g.webp" 
    alt="" 
    className="absolute right-0"
  />
  </div>
  
  {/* Content */}
  <Header className="z-30" />
  <Hero className="!z-30" />
  

  {/* Black shadow at the bottom */}
  <div 
    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"
  ></div>
  
   </div>
   </div>
  <Service className="!z-60"/>
</div>
    </div>
    )
}
export default LandingPage;