import { Link } from "react-router-dom";
import Header from "../../Components/ForAll/Header";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const Error = () =>{
    return(
        <div 
        className="bg-black relative h-fit" 
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
        }}
      >
        {/* Background images */}
        <img 
          src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040744/nexile%20digital/asset/krjhtmdwyfeoebirihzq.webp" 
          alt="" 
          className="absolute left-0"
        />
        <img 
          src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/ebqjrqhwdf0puwpmup9g.webp" 
          alt="" 
          className="absolute right-0 z-0 w-1/2"
        />
        
        {/* Content */}
        <Header className="z-30" />

        {/* Main Content */}
        <div className="z-30">
        <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731045840/nexile%20digital/asset/mm8nuifidjwttnubfnpz.webp" alt=""
        className="w-full mx-auto" />
         <a href="/"><div className="flex justify-center pb-20 mt-[-40px]"><button className="bg-white py-2 px-7 rounded-sm poppins-medium text-[25px] flex items-center gap-3 justify-center"><MdOutlineKeyboardDoubleArrowLeft />         Back Home</button></div>
         </a>
        </div>
      
        {/* Black shadow at the bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"
        ></div>
      </div>
    )
}

export default Error;