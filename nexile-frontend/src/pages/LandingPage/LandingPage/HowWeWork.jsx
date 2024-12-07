import { useEffect } from "react";
import { useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";

const HowWeWork = () =>{

    const [howWeWork, setHowWeWork] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchHowWeWork = async () => {
      try {
        const response = await axios.get(`${endPoint}/howwework`);
        setHowWeWork(response.data);
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


    return(
        <div className="px-8 lg:py-5 relative overflow-x-hidden"> <h2 className="text-white lg:py-20 pb-6 lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
     HOW WE WORK
          </h2>
       
        <div className="grid grid-cols-2 gap-18">
            <div className="flex gap-2">
                <div className="relative w-16 h-16">
                    <div className={`bg-[#${howWeWork[0]?.color}] w-16 h-16 rounded-full opacity-50`}></div>
                    <div className={`bg-[#${howWeWork[0]?.color}] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%]`}></div>
                </div>
                <div className="w-[45%]">
                <h6 className="text-white text-[20px] poppins-medium underline">{howWeWork[0]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-light">{howWeWork[0]?.description}</h6>
                </div>
                <div className="w-[260px] h-[180px] rounded-2xl">
                    <img src={howWeWork[0]?.thumbnail} alt={howWeWork[0]?.title} className="w-[260px] h-[180px] rounded-2xl"/>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-[260px] h-[180px] rounded-2xl">
                    <img src={howWeWork[3]?.thumbnail} alt={howWeWork[3]?.title} className="w-[260px] h-[180px] rounded-2xl"/>
                </div>
                <div className="relative w-16 h-16">
                    <div className={`bg-[#${howWeWork[3]?.color}] w-16 h-16 rounded-full opacity-50`}></div>
                    <div className={`bg-[#${howWeWork[3]?.color}] w-10 h-10 rounded-full opacity-100 
                    absolute top-[17%] left-[18%]`}></div>
                    <div className={`bg-[#fff] w-6 h-6 rounded-full opacity-100 absolute top-[29%] left-[31%]`}></div>
                </div>
                <div className="w-[45%]">
                <h6 className="text-white text-[20px] poppins-medium underline">{howWeWork[3]?.title}</h6>
                <h6 className="text-white text-[16px] poppins-light">{howWeWork[3]?.description}</h6>
                </div>
            </div>
        </div>


        </div>
    )
}
export default HowWeWork; 