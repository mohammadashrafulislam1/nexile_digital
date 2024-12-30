import { Link } from "react-router-dom";

const ContactBtn =()=>{
    return(
        <div className="lg:h-[520px] h-[480px] w-full lg:grid lg:grid-cols-2 md:grid-cols-2 gap-10 justify-center relative items-centers"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734799834/nexile%20digital/asset/t9uo4rq4bl0x7jugoszh.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: 0,
        }}>
            {/* Black shadow at the bottom */}
  <div
    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
  ></div>

            <div className="lg:mt-40 mt-24 mb-[-180px]">
              <p className="text-white text-center md:text-[24px] text-[16px] poppins-light">DO YOU</p>
              <h4 className="text-white md:text-[48px] text-[38px] poppins-semibold underline text-center">Want your imagination into reality?</h4>
             <div className="flex justify-center items-center">
              <Link to={"/contact_us"}><button className="bg-white lg:py-2 lg:px-5 mt-6 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">Let’s Work Together!</button></Link>
             </div>
            </div>
         
         <div>

         </div>
        </div>
    )
}
export default ContactBtn;