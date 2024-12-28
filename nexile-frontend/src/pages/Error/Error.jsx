import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      {/* Helmet */}
      <Helmet>
        <title>404 Error - Nexile Digital</title>
        <meta
          name="description"
          content="Nexile Digital provides all-in-one digital solutions, including web development, web design, SEO, video editing, UX & UI design, and Figma services."
        />
      </Helmet>

      {/* Content */}
      <div className="bg-black overflow-hidden">
        <div className="relative z-0 bg-black">
          <div
            style={{
              backgroundImage:
                'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              zIndex: 0,
              height: "940px",
            }}
            className="relative md:h-[940px] h-[500px]"
          >

            {/* Background images */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/ebqjrqhwdf0puwpmup9g.webp"
                alt="Background detail"
                className="absolute right-0 z-[-1]"
              />
              <img
                src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040744/nexile%20digital/asset/krjhtmdwyfeoebirihzq.webp"
                alt="Background detail"
                className="absolute left-0 z-[-1]"
              />
            </div>
            
            {/* Transparent box with borders */}
           <div
  className="md:h-[940px] h-[500px] mx-auto my-auto flex items-center justify-center p-1">
           <div
  className="md:w-[714px] bg-contain surface-duo w-full md:h-[701px] mx-auto my-auto md:p-[40px] p-9"
  style={{
    backgroundImage: "url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1735398014/nexile%20digital/asset/t5stitbzllfjnxnmqjsp.webp)",
    borderRadius: "16px", 
      backgroundPosition: "center", // Centers the background image
      backgroundRepeat:"no-repeat"
  }}
>
  <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1735399287/nexile%20digital/asset/tf8sy1o17ueddlfptnyo.webp" alt="" 
  className="md:pb-[40px] pb-3 lg:w-[80%] md:w-[80%] w-1/2" />
  <div className="hr"></div>
  <p className="md:py-[30px] py-3 text-white md:text-[40px] text-[15px] poppins-regular">
    There is no such page or element or section like this, redirect to other pages.</p>
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


            {/* Black shadow at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
