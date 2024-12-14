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
          <h2 className="text-white lg:py-10 lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
            {founder ? founder[0]?.title : ""}
          </h2>
          <div className="border-b-[0.5px] opacity-30"></div>

          <div className="grid grid-cols-3">
          <div className="col-span-1 border-r-[0.5px] h-[877px] border-[#333] flex flex-col gap-10 mt-20 relative">
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
    <h1 className="text-9xl text-white poppins-bold">
      {founder ? founder[0]?.year : ""}
    </h1>
  </div>

  {/* Client Satisfaction Section */}
  <div className="relative z-20 mt-20">
    <p className="text-white uppercase poppins-light text-[20px]">
      Client satisfaction
    </p>
    <h1 className="text-9xl text-white poppins-bold">
      {founder ? founder[0]?.satisfaction : "0"}%
    </h1>
  </div>

  {/* Completed Projects Section */}
  <div className="relative z-10 mt-20">
    <p className="text-white uppercase poppins-light text-[20px]">
      Total completed projects
    </p>
    <h1 className="text-9xl text-white poppins-bold">
      {founder ? founder[0]?.completedPersonally : "0"}+
    </h1>
    <p className="text-white poppins-light text-center">Personally</p>
  </div>

</div>

            <div className="col-span-2 px-24 py-10 relative">
              <h4 className="text-white poppins-semibold text-[50px] underline">
                {founder ? founder[0]?.des : ""}
              </h4>
              <a href="https://mdashrafulislam-portfolio.netlify.app/" target="_blank" className="absolute bottom-[56%] left-[230px] z-30"><h5 className="text-white poppins-light text-2xl mt-[-10px] underline">
  Visit Website
  <span className="bg-[#00ECFB] w-2 h-2 ml-2 rounded-sm inline-block"></span>
</h5>
</a>
             <div className="flex absolute bottom-[26%] left-[150px] z-30">
              <div className="mr-[-2px]">
              <h6 className="text-white poppins-semibold text-xl mb-0">{founder ? founder[0]?.experience :''} YEARS</h6>
              <p className="text-white poppins-light text-lg mt-[-10px]">experience</p>
              </div>
              <h2 className="text-white poppins-semibold text-3xl mb-0 uppercase pr-[630px] 
              text-right ml-[-100px] mt-0">{founder ? founder[0]?.founderName:''}</h2>
             </div>
             <div className="mr-[-160px] relative">
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
