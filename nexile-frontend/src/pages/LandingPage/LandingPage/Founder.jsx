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
          <div className="border-b-[0.5px] opacity-50"></div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r-[0.5px] border-[#fff] mt-20">
              <div>
                <p className="text-white uppercase poppins-light text-[20px]">
                  Working since
                </p>
                <h1 className="text-9xl text-white poppins-bold">
                  {founder ? founder[0]?.year : ""}
                </h1>
              </div>

              <div>
                <p className="text-white uppercase poppins-light text-[20px] mt-20">
                  Client satisfaction
                </p>
                <h1 className="text-9xl text-white poppins-bold">
                  {founder ? founder[0]?.satisfaction : "0"}%
                </h1>
              </div>

              <div>
                <p className="text-white uppercase poppins-light text-[20px] mt-20">
                  Total completed projects
                </p>
                <h1 className="text-9xl text-white poppins-bold">
                  {founder ? founder[0]?.completedPersonally : "0"}+
                </h1>
              </div>
            </div>

            <div className="col-span-2 px-24 py-10">
              <h4 className="text-white poppins-semibold text-[50px] underline">
                {founder ? founder[0]?.des : "0"}
              </h4>

              <div className="mr-[-160px] relative">
                <img
                  src={founder ? founder[0]?.founderImage : ""}
                  alt={founder ? founder[0]?.founderName : ""}
                />
                
<div
  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/100 to-transparent z-20"
>
  <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734079536/nexile%20digital/asset/bqsw3evceqmolxx6phe4.webp" alt="" />
</div>
               <div
  className="absolute bottom-0 left-0 right-0 h-130 bg-gradient-to-t from-black via-black/95 to-transparent z-10"
></div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Founder;
