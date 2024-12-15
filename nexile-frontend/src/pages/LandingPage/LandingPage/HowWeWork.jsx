import { useEffect } from "react";
import { useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";
import ReactPlayer from "react-player/vimeo";

const HowWeWork = () =>{
    const [activeVideo, setActiveVideo] = useState(null);
    const [howWeWork, setHowWeWork] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchHowWeWork = async () => {
      try {
        const response = await axios.get(`${endPoint}/howwework`);
        const data = response.data.map((item) => ({
            ...item,
            color: item.color || "FFFFFF", // Fallback color if not provided
          }));
        setHowWeWork(data);
      } catch (error) {
        console.error("Error fetching HowWeWorks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHowWeWork();
    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  console.log(howWeWork)
  const openModal = (index) => {
    setActiveVideo(index); // Set the clicked video as active
    setIsModalOpen(true); // Open the modal
};

const closeModal = () => {
    setActiveVideo(null); // Reset the active video
    setIsModalOpen(false); // Close the modal
};

    return(
        <div className="px-8 lg:pb-5 relative overflow-hidden"> <h2 className="text-white lg:py-20 pb-6  lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
     HOW WE WORK
          </h2>
       
        <div className="grid lg:grid-cols-2 gap-18 mt-8">
            <div className="md:flex gap-2 group lg:mb-0 mb-5">
                <div className="relative w-16 h-16">
                    <div className={`bg-[#FF0000] w-16 h-16 rounded-full opacity-30`}></div>
                    <div className={`bg-[#FF0000] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%] flex
                        justify-center items-center poppins-semibold`}>1</div>
                </div>
                <div className="md:w-[50%]">
                <h6 className="text-white text-[18px] poppins-medium underline">{howWeWork[0]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-regular">{howWeWork[0]?.description}</h6>
                </div>
                {/* Right section: Video thumbnail */}
                <div
                            className="w-[260px] mt-5 h-[180px] rounded-2xl relative group-hover:opacity-90 cursor-pointer md:invisible hide group-hover:block
                            md:group-hover:visible"
                            onClick={() => openModal(0)}
                            style={{
                                backgroundImage: `url(${howWeWork[0]?.thumbnail})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >
                            {/* Play button */}
                            <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
            </div></div>

            <div className="md:flex gap-2 group mb-5">
                                {/* Right section: Video thumbnail */}
                                <div
                            className="w-[260px] h-[180px] rounded-2xl md:mt-0 mt-5 mb-5 relative group-hover:opacity-90 cursor-pointer md:invisible hide group-hover:block md:group-hover:visible"
                            onClick={() => openModal(3)}
                            style={{
                                backgroundImage: `url(${howWeWork[3]?.thumbnail})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >
                            {/* Play button */}
                            <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
            </div>
                <div className="relative w-16 h-16">
                    <div className={`bg-[#2D9A06] w-16 h-16 rounded-full opacity-30`}></div>
                    <div className={`bg-[#2D9A06] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%] flex
                        justify-center items-center poppins-semibold`}>4</div>
                </div>
                <div className="md:w-[50%]">
                <h6 className="text-white text-[18px] poppins-medium underline">{howWeWork[3]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-regular">{howWeWork[3]?.description}</h6>
                </div>
            </div>
        </div>
 
        <div className="md:flex gap-2 lg:pl-[440px] lg:pl-[150px] md:pr-[130px] mt-5 group mb-5">
                {/* Right section: Video thumbnail */}
                <div
                            className="w-[260px] h-[180px] rounded-2xl relative mb-5 group-hover:opacity-90 cursor-pointer md:invisible hide group-hover:block md:group-hover:visible"
                            onClick={() => openModal(2)}
                            style={{
                                backgroundImage: `url(${howWeWork[2]?.thumbnail})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >
                            {/* Play button */}
                            <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
            </div>
                <div className="relative w-16 h-16">
                    <div className={`bg-[#FF00E5] w-16 h-16 rounded-full opacity-30`}></div>
                    <div className={`bg-[#FF00E5] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%] flex
                        justify-center items-center poppins-semibold`}>3</div>
                </div>
                <div className="md:w-[45%]">
                <h6 className="text-white text-[18px] poppins-medium underline">{howWeWork[2]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-regular">{howWeWork[2]?.description}</h6>
                </div>
            </div>

            <div className="md:flex gap-2 lg:pr-[420px] lg:pl-[250px] mt-5 group mb-5">
                <div className="relative w-16 h-16">
                    <div className={`bg-[#0019FF] w-16 h-16 rounded-full opacity-30`}></div>
                    <div className={`bg-[#0019FF] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%] flex
                        justify-center items-center poppins-semibold`}>2</div>
                </div>
                <div className="md:w-[45%]">
                <h6 className="text-white text-[18px] poppins-medium underline">{howWeWork[1]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-regular">{howWeWork[1]?.description}</h6>
                </div>
                {/* Right section: Video thumbnail */}
                <div
                            className="w-[260px] h-[180px] rounded-2xl mt-5 relative group-hover:opacity-90 cursor-pointer hide group-hover:block md:invisible md:group-hover:visible"
                            onClick={() => openModal(1)}
                            style={{
                                backgroundImage: `url(${howWeWork[1]?.thumbnail})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >
                            {/* Play button */}
                            <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
            </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30"
                  >
                    <div className="bg-black rounded-2xl overflow-hidden w-[80%] lg:w-[60%] h-[72%]"
                style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1733497901/nexile%20digital/asset/emrwdlzc7rb2y5hn7tou.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0, // Send background layer to the back
                  }}>
                        <div className="relative w-full h-full">
                            <ReactPlayer
                                url={howWeWork[activeVideo]?.video} // Vimeo video URL
                                playing={true}
                                controls={true}
                                width="100%"
                                height="100%"
                            />
                            {/* Close button */}
                            <button
                                className="absolute top-2 left-2 text-white bg-red-700 rounded-full w-8 h-8 flex justify-center items-center"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default HowWeWork; 