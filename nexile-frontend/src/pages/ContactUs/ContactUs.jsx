import { Helmet } from "react-helmet";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { GrMapLocation } from "react-icons/gr";
import { RxEnvelopeClosed } from "react-icons/rx";
import { Link } from "react-router-dom";

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

     

     <div className=" h-[1040px]">
     <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" 
             style={{letterSpacing:'-5px'}}>Nexile digital is always here</h2>
      <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center">To help you and make your business large.</p>
      <div className="flex justify-center items-center gap-7 mt-12">
        {/* Address clients */}
        <div className="flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-[#00FF29] p-1 text-[30px] text-center flex justify-center items-center text-white rounded">
                <GrMapLocation /> 
                </div>
                <div className="flex flex-col gap-0">
                <h6 className="poppins-regular text-white text-[18px]">Address</h6>
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">Regina, SK, Canada</p>
                </div>
            </div>

             {/* Email  */}
             <div className="flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-[#FF0000] p-1 text-[30px] text-center flex justify-center items-center text-white rounded">
                <RxEnvelopeClosed/>
                </div>
                <div className="flex flex-col gap-0">
                <h6 className="poppins-regular text-white text-[18px]">Email Us</h6>
                  <p className="text-white poppins-medium text-[16px] mt-[-5px]">contact@nexiledigital.com</p>
                </div>
            </div>
      </div>
     </div>


    
    
      {/* Black shadow at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>
    
    
     

    <div
  className="md:h-[1837px]  mx-auto my-auto flex items-center justify-center mb-24 mt-[-580px] z-24 relative">
     <div
  className="md:w-[910px] bg-cover surface-duo w-full md:h-[1837px] mx-auto my-auto md:p-[40px] p-9"
  style={{
    backgroundImage: "url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1735433829/nexile%20digital/asset/ja6swmxfb0v8aqde4rrg.webp)",
    borderRadius: "16px", 
      backgroundPosition: "center", // Centers the background image
      backgroundRepeat:"no-repeat"
  }}
>
         <h2 style={{
                fontSize: "90px",
                background: "linear-gradient(30deg, #FA7C0B, #9F8CED, #9DE8EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }} className="poppins-extrabold pb-0 mb-0">
                Contact US
            </h2>
            <p className="text-white md:text-[40px] text-[15px] poppins-regular pt-0 mt-[-20px] mb-7">Get your solutions right now!</p>

           <form action="" className="flex flex-col pb-[40px]">

           <label className="w-full max-w-full gap-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">your full name</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">your email</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">your phone number</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">your website (optional)</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">what service / services you want?</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">what is your subject?</span>
  </div>
  <input type="text" className="w-full max-w-full h-[70px] px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>

<label className="w-full max-w-full mt-3">
  <div className="label">
    <span className="label-text text-white poppins-regular text-[28px] mb-2">what you want please describe?</span>
  </div>
  <textarea type="text" rows={13} className="w-full max-w-full px-8 bg-[#2F2E2E] text-[22px] mt-3 rounded-[10px] text-white" />
</label>
{/* Submit Button */}
<button
    type="submit"
    className=" mt-12 w-full py-4 bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] to-[#9F8CED] text-white text-[24px] rounded-[10px] hover:opacity-90 transition-opacity"
  >
    Submit
  </button>
           </form>

           <div className="hr"></div>
  <div className="md:flex items-center justify-between">
    <div className="flex items-center gap-[16px] md:py-[30px] py-3">
      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1735400603/nexile%20digital/asset/qhm8etcrac00079ygcgx.webp" alt="" />
      <div>
      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1735400846/nexile%20digital/asset/rn9scov5a8mxsyu6doqk.webp" alt="" />
      <p className="text-[#808182] text-[16px] mt-0">nexiledigital.com</p>
      </div>
    </div>
    <div className="flex md:gap-6 gap-3">
     <Link to="/"> <button className="text-white uppercase md:poppins-black poppins-semibold bg-[#141414] rounded-full border-[#333333] border-[2px]
      md:w-[160px] w-[100px] md:h-[48px] h-[35px] md:text-[15px] text-[13px]">Home Page</button></Link>
      <Link to="/contact_us"> <button className="text-white uppercase md:poppins-black poppins-semibold bg-[#141414] rounded-full border-[#333333] border-[2px]
      md:w-[160px] w-[100px] md:h-[48px] h-[35px] md:text-[15px] text-[13px]">Contact us</button></Link>
    </div>
  </div>

</div>  
     </div>

       
      <Footer className="!z-24"/>
      </div>
    </div>
        </div>
    )
}

export default ContactUs;