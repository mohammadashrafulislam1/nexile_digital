import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";

const About = ()=>{
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
          try {
            const response = await axios.get(`${endPoint}/about`);
            setAbout(response.data);
          } catch (error) {
            console.error("Error fetching services:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchService();
        // Set a timeout for loader to hide after 2 seconds if data fetch is complete
        const timer = setTimeout(() => setLoading(false), 2000);
    
        return () => clearTimeout(timer); // Clear the timer on component unmount
      }, []);

    console.log(about)
    return(
        <div className="px-8 pb-20 lg:my-5 relative overflow-x-hidden"
        style={{
            backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1733497901/nexile%20digital/asset/emrwdlzc7rb2y5hn7tou.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Ensure background is a layer
            zIndex: 0, // Send background layer to the back
          }}>

        <div className="lg:flex justify-end flex-row-reverse items-center">
              <h2 className="text-white lg:py-6 pb-6 text-right lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
              ABOUT
                <br />
                NEXILE DIGITAL
              </h2>
              <div>
                <p className="font-[100] text-white text-[20px]">{about?.intro?.whoWeAre}</p>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
                    className="lg:w-[125px] w-[80px] ml-10 lg:mt-[-30px] lg:mb-[-10px]"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            
            {/* option 1 */}
            <div className="flex items-center gap-10 relative pl-10">
                <div>
                <div
                      className=" border border-2px lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
                      bg-white text-black transition duration-300  md:block hidden absolute top-[40%] left-0"
                      style={{
                        boxShadow: "0 0 10px 14px rgba(0, 236, 251, 0.4)", // Shadow in the middle with spread
                      }}
                    >
                      <BsArrowLeft />
                    </div>
                    <img src={about?.ourStory?.image?.url} alt={about?.ourStory?.description} className="w-[350px] h-[350px] rounded-2xl"/>
                </div>

                <div className="text-white">
                    <h3 className="text-[50px] uppercase font-bold">Our Story</h3>
                    <p>{about?.ourStory?.description}</p>
                </div>
            </div>

            {/* option 2 */}
            <div>
                <div><img src="" alt="" /></div>

                <div>
                    <h3></h3>
                    <p></p>
                </div>
            </div>

            {/* option 3 */}
            <div>
                <div><img src="" alt="" /></div>

                <div>
                    <h3></h3>
                    <p></p>
                </div>
            </div>
            
        </div>
    )
}
export default About;