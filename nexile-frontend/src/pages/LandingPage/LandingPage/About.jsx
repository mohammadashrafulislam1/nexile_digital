import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const About = ()=>{
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  const SkeletonLoader = () => (
    <div className="px-8 pb-20 lg:py-5 relative overflow-hidden animate-pulse">
      {/* Background placeholders */}
      <div className="absolute top-10 right-0 bg-gray-300 w-[200px] h-[200px] rounded-md"></div>
      <div className="absolute top-10 left-0 bg-gray-300 w-[200px] h-[200px] rounded-md"></div>
  
      {/* Title Section */}
      <div className="lg:flex justify-end flex-row-reverse items-center mt-14 md:mt-0 gap-5">
        <div className="w-full lg:w-1/2">
          <div className="h-[150px] lg:h-[300px] bg-gray-300 rounded-md mb-5"></div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="h-[20px] bg-gray-300 rounded-md mb-4"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-4"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-4"></div>
          <div className="w-[125px] h-[125px] bg-gray-300 rounded-full ml-10"></div>
        </div>
      </div>
  
      {/* Option 1 */}
      <div className="lg:flex items-center gap-10 relative md:px-10 p-3 group mt-10">
        <div className="relative">
          <div className="w-[300px] h-[300px] bg-gray-300 rounded-md"></div>
          <div className="absolute top-[40%] left-0 w-10 h-10 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>
        <div>
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
        </div>
      </div>
  
      {/* Option 2 */}
      <div className="lg:flex items-center flex-row-reverse gap-10 relative md:px-10 p-3 group mt-10">
        <div className="relative">
          <div className="w-[300px] h-[300px] bg-gray-300 rounded-md"></div>
          <div className="absolute top-[40%] right-0 w-10 h-10 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>
        <div className="text-right">
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
        </div>
      </div>
  
      {/* Option 3 */}
      <div className="lg:flex items-center gap-10 relative md:px-10 p-3 group mt-10">
        <div className="relative">
          <div className="w-[300px] h-[300px] bg-gray-300 rounded-md"></div>
          <div className="absolute top-[40%] left-0 w-10 h-10 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>
        <div>
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
          <div className="h-[20px] bg-gray-300 rounded-md mb-3"></div>
        </div>
      </div>
    </div>
  );

    useEffect(() => {
        const fetchAbout = async () => {
          try {
            const response = await axios.get(`${endPoint}/about`);
            setAbout(response.data);
          } catch (error) {
            console.error("Error fetching Abouts:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchAbout();
        // Set a timeout for loader to hide after 2 seconds if data fetch is complete
        const timer = setTimeout(() => setLoading(false), 2000);
    
        return () => clearTimeout(timer); // Clear the timer on component unmount
      }, []);

    console.log(about)
    return(
        <div className="px-8 lg:py-5 relative overflow-hidden"
        style={{
            backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1733497901/nexile%20digital/asset/emrwdlzc7rb2y5hn7tou.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Ensure background is a layer
            zIndex: 0, // Send background layer to the back
          }}>
            <div
    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
  ></div>
      {
        loading ? (<SkeletonLoader />) : (
        <div className="pb-20">

        <div>
        <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1733510248/nexile%20digital/asset/vduwhw1frlhz0szyueex.webp" 
        alt="NEXILE DIGITAL" 
        className="absolute top-10 right-0"/>
        
        <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1733510488/nexile%20digital/asset/jtftmmvlctuvrdu1cgyk.webp" 
        alt="NEXILE DIGITAL" 
        className="absolute top-10 left-0 z-[-10]" />
    </div>

<div className="lg:flex justify-end flex-row-reverse items-center mt-14 md:mt-0">
      <h2 className="text-white lg:py-6 pb-6 text-right lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
      ABOUT
        <br />
        NEXILE DIGITAL
      </h2>
      <div>
        <p className="font-[100] text-white text-[20px]">{about?.sectionDes}</p>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
            className="lg:w-[125px] w-[80px] ml-10"
            alt=""
          />
        </Link>
      </div>
    </div>

    
{/* Option 1 */}
<div className="lg:flex items-center gap-10 relative md:px-10 p-3 group mt-10">
<div>
<div
className="border-2 lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
bg-white text-black transition duration-300 z-10 md:block hidden absolute lg:top-[40%] md:top-[30%] top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_15px_rgba(0,236,251,0.4)]"
>
<BsArrowLeft />
</div>
<div className="lg:w-[300px] w-full lg:h-[300px] h-full hidden group-hover:block transition duration-300 transform">
<img
src={about?.ourStory?.image?.url}
alt={about?.ourStory?.description}
className="lg:w-[300px] w-full lg:h-[300px] h-full object-cover object-center"
/>
</div>
</div>

<div className="text-white">
<h3 className="text-[40px] uppercase font-bold">Our Story</h3>
<p className="font-[100] text-white text-[20px]">{about?.ourStory?.description}</p>
</div>
</div>

{/* Option 2 */}
<div className="lg:flex items-center flex-row-reverse gap-10 relative md:px-10 p-3 group mt-10">
<div>
<div className="lg:w-[300px] w-full lg:h-[300px] h-full  hidden group-hover:block transition duration-300 transform">
<div
className="border-2 lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
bg-white text-black transition duration-300 md:block hidden absolute top-[40%] right-0 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_15px_rgba(0,236,251,0.4)]"
>
<BsArrowRight />
</div>
<img
src={about?.ourMission?.image?.url}
alt={about?.ourMission?.description}
className="lg:w-[300px] w-full lg:h-[300px] h-full  object-cover object-center"
/>
</div>
</div>

<div className="text-white text-right">
<h3 className="text-[40px] uppercase font-bold">Our Mission</h3>
<p className="font-[100] text-white text-[20px]">{about?.ourMission?.description}</p>
</div>
</div>

{/* Option 3 */}
<div className="lg:flex items-center gap-10 relative md:px-10 p-3 group mt-10 mb-10">
<div>
<div
className="border-2 lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
bg-white text-black z-10 transition duration-300 md:block hidden absolute top-[40%] left-0 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_15px_rgba(0,236,251,0.4)]"
>
<BsArrowLeft />
</div>
<div className="lg:w-[300px] w-full lg:h-[300px] h-full  hidden group-hover:block transition duration-300 transform">
<img
src={about?.ourVision?.image?.url}
alt={about?.ourVision?.description}
className="lg:w-[300px] w-full lg:h-[300px] h-full  object-cover object-center"
/>
</div>
</div>

<div className="text-white">
<h3 className="text-[40px] uppercase font-bold">Our Vision</h3>
<p className="font-[100] text-white text-[20px]">{about?.ourVision?.description}</p>
</div>
</div>
        </div>)
      }
        </div>
    )
}
export default About;