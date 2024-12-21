import { Helmet } from "react-helmet";
import Header from "../../../Components/ForAll/Header";
import Hero from "./Hero";
import Service from "./Services";
import About from "./About";
import HowWeWork from "./HowWeWork";
import Founder from "./Founder";
import Works from "./Works";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import ContactBtn from "./ContactBtn";

const LandingPage = ()=>{
    return(
    <div>
    {/* Helmet */}
    <Helmet>
    <meta name="description" content="Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
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
<Hero className="relative z-20" />


  {/* Black shadow at the bottom */}
  <div
    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
  ></div>
</div>

   </div>
  <Service className="!z-60"/>
  <About className="!z-60"/>
  <HowWeWork className="!z-60"/>
  <Founder className="!z-60"/>
  <Works className="!z-60"/>
  <Testimonials className="!z-60"/>
  <FAQs className="!z-60"/>
  <ContactBtn className="!z-60"/>
</div>
    </div>
    )
}
export default LandingPage;