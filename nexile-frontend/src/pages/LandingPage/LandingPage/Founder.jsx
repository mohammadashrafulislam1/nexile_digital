import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Founder = () => {
  const [founder, setFounder] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const response = await axios.get(`${endPoint}/founder`);
        setFounder(response.data);
      } catch (error) {
        console.error("Error fetching Founders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFounder();

    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse pt-[160px]">
      <div className="bg-gray-300 w-[60%] mx-auto h-[60px] rounded"></div>
      <div className="bg-gray-300 w-[50%] mx-auto h-[60px] mt-[10px] rounded"></div>
      <div className="bg-gray-300 w-[30%] mx-auto h-[60px] mt-[10px] rounded"></div>
      <div className="flex gap-2 w-[90%] mx-auto mt-10 items-center justify-center">
        <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
        <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
        <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
        <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
        <div className="h-6 bg-white w-full p-[30px] rounded lg:block hidden"></div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="my-10 px-8 lg:pb-5 relative overflow-hidden">
          <h2 className="text-white md:mt-0 mt-7 lg:py-10 lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
            {founder ? founder[0]?.title : ""}
          </h2>
          <div className="border-b-[0.5px] opacity-30 md:mt-0 mt-5"></div>

          <div className="grid md:grid-cols-3">
          <div className="md:col-span-1 md:border-r-[0.5px] lg:h-[877px] md:h-[600px] border-[#333] flex flex-col md:gap-10 gap-0 mt-20 relative">
  {/* Decorative Background Image */}
  <img 
    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734140579/nexile%20digital/asset/gpxiwox8b63hdydxgtvf.webp" 
    alt="Nexile Digital" 
    className="absolute w-full h-full top-[-130px] left-[-30px] object-cover z-0" 
  />

  {/* Working Since Section */}
  <div className="relative z-10">
    <p className="text-white uppercase poppins-light text-[20px]">
      Working since
    </p>
    <h1 className="lg:text-9xl md:text-5xl text-9xl text-white poppins-bold">
      {founder ? founder[0]?.year : ""}
    </h1>
  </div>

  {/* Client Satisfaction Section */}
  <div className="relative z-20 mt-20">
    <p className="text-white uppercase poppins-light text-[20px]">
      Client satisfaction
    </p>
    <h1 className="lg:text-9xl md:text-5xl text-9xl text-white poppins-bold">
      {founder ? founder[0]?.satisfaction : "0"}%
    </h1>
  </div>

  {/* Completed Projects Section */}
  <div className="relative z-10 mt-20">
    <p className="text-white uppercase poppins-light text-[20px]">
      Total completed projects
    </p>
    <h1 className="lg:text-9xl md:text-5xl text-9xl text-white poppins-bold">
      {founder ? founder[0]?.completedPersonally : "0"}+
    </h1>
    <p className="text-white poppins-light text-center">Personally</p>
  </div>

</div>

            <div className="md:col-span-2 lg:px-24 py-10 relative">
              <h4 className="text-white poppins-semibold lg:text-[50px] md:text-[30px] text-[30px] underline pl-3">
                {founder ? founder[0]?.des : ""}
              </h4>
              <a href="https://mdashrafulislam-portfolio.netlify.app/" target="_blank" 
              className="absolute bottom-[56%] md:bottom-[65%] lg:left-[230px] md:left-[30px] z-30"><h5 className="text-white poppins-light md:text-2xl text-md mt-[-10px] underline">
  Visit Website
  <span className="bg-[#00ECFB] w-2 h-2 ml-2 rounded-sm inline-block"></span>
</h5>
</a>
             <div className="flex absolute md:gap-0 gap-6 md:bottom-[38%] lg:bottom-[29%] bottom-[35%] md:left-[70px] lg:left-[150px] lg:z-30 md:z-50">
              <div className="mr-[-2px]">
              <h6 className="text-white poppins-semibold text-xl md:mb-0">{founder ? founder[0]?.experience :''} YEARS</h6>
              <p className="text-white poppins-light md:text-lg text-md mt-[-10px]">experience</p>
              </div>
              <h2 className="text-white poppins-semibold md:text-3xl text-2xl mb-0 uppercase lg:pr-[630px] md:pr-[550px] pr-[400px] 
              text-right ml-[-100px] md:mt-0 mt-1 md:z-10 z-50">{founder ? founder[0]?.founderName:''}</h2>
             </div>
             <div className="lg:mr-[-160px] mr-[-56px] relative">
  {/* Primary Founder Image */}
  <img
    src={founder ? founder[0]?.founderImage : ""}
    alt={founder ? founder[0]?.founderName : ""}
    className="relative z-20" // Ensure this is above the decorative image
  />

  {/* Decorative Image Overlay */}
  <img
    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734139170/nexile%20digital/asset/fgyjlcl7x1xoz826hlar.webp"
    alt=""
    className="absolute top-[-100px] bottom-0 left-[-20px] w-full h-full z-10" // Lower z-index
  />

  {/* Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/100 to-transparent z-30">
    <img
      src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734079536/nexile%20digital/asset/bqsw3evceqmolxx6phe4.webp"
      alt=""
    />
  </div>

  {/* Additional Gradient for Depth */}
  <div className="absolute bottom-0 left-0 right-0 h-130 bg-gradient-to-t from-black via-black/95 to-transparent z-15"></div>
</div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Founder;
